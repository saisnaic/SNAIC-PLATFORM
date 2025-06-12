import {
    getFileFromStorage,
    handleDocumentLoaderDocuments,
    ICommonObject,
    INode,
    IDocument,
    INodeData,
    INodeOutputsValue,
    INodeParams,
    handleDocumentLoaderMetadata,
    handleDocumentLoaderOutput
} from '../../../src'
import Excel from 'exceljs'
import { Readable } from 'node:stream'
import { JSONLoader } from 'langchain/document_loaders/fs/json'
import { Cell } from '../../files/Excel/Model/Cell'
import { Worksheet } from '../../files/Excel/Model/Worksheet'

// Type definitions for our data structures
type SingleColumnData = {
    columnName: string
    values: string[]
    worksheetName: string
    totalRows: number
}

type FullWorksheetData = Worksheet[]

type ExcelFileData = SingleColumnData | FullWorksheetData | {}

class Excel_DocumentLoader implements INode {
    label: string
    name: string
    version: number
    description: string
    type: string
    icon: string
    category: string
    baseClasses: string[]
    inputs: INodeParams[]
    outputs: INodeOutputsValue[]

    constructor() {
        this.label = 'Excel File'
        this.name = 'excelFile'
        this.version = 0.5
        this.type = 'Document'
        this.icon = 'excel.svg'
        this.category = 'Document Loaders'
        this.description = `Load data from Excel files with optional single column extraction`
        this.baseClasses = [this.type]
        this.inputs = [
            {
                label: 'Excel File',
                name: 'excelFile',
                type: 'file',
                fileType: '.xlsx'
            },
            {
                label: 'Column',
                name: 'column',
                type: 'string',
                description:
                    'Specify a column name (e.g., "Name") or column index (e.g., "0", "1") to extract only that column. Leave empty to extract all data.',
                optional: true,
                placeholder: 'Name or 0'
            },
            {
                label: 'Worksheet Name',
                name: 'worksheetName',
                type: 'string',
                description: 'Specify worksheet name to read from. If empty, reads from the first worksheet.',
                optional: true,
                placeholder: 'Sheet1'
            },
            {
                label: 'Additional Metadata',
                name: 'metadata',
                type: 'json',
                description: 'Additional metadata to be added to the extracted documents',
                optional: true,
                additionalParams: true
            },
            {
                label: 'Omit Metadata Keys',
                name: 'omitMetadataKeys',
                type: 'string',
                rows: 4,
                description:
                    'Each document loader comes with a default set of metadata keys that are extracted from the document. You can use this field to omit some of the default metadata keys. The value should be a list of keys, seperated by comma. Use * to omit all metadata keys execept the ones you specify in the Additional Metadata field',
                placeholder: 'key1, key2, key3.nestedKey1',
                optional: true,
                additionalParams: true
            }
        ]
        this.outputs = [
            {
                label: 'Document',
                name: 'document',
                description: 'Array of document objects containing metadata and pageContent',
                baseClasses: [...this.baseClasses, 'json']
            },
            {
                label: 'JSON',
                name: 'json',
                description: 'Concatenated string from pageContent of documents',
                baseClasses: ['string', 'json']
            }
        ]
    }

    getFiles(nodeData: INodeData) {
        const excelFileBase64 = nodeData.inputs?.excelFile as string

        let files: string[]
        let fromStorage: boolean = true

        if (excelFileBase64.startsWith('FILE-STORAGE::')) {
            const fileName = excelFileBase64.replace('FILE-STORAGE::', '')
            if (fileName.startsWith('[') && fileName.endsWith(']')) {
                files = JSON.parse(fileName)
            } else {
                files = [fileName]
            }
        } else {
            if (excelFileBase64.startsWith('[') && excelFileBase64.endsWith(']')) {
                files = JSON.parse(excelFileBase64)
            } else {
                files = [excelFileBase64]
            }

            fromStorage = false
        }

        return { files, fromStorage }
    }

    async getFileData(
        file: string,
        { chatflowid }: { chatflowid: string },
        fromStorage?: boolean,
        column?: string | number,
        worksheetName?: string
    ): Promise<ExcelFileData> {
        if (fromStorage) {
            const fileData = await getFileFromStorage(file, chatflowid)
            const excelWorkBook = new Excel.Workbook()
            await excelWorkBook.xlsx.read(Readable.from(fileData))
            return this.readWorkbook(excelWorkBook, column, worksheetName)
        } else {
            const splitDataURI = file.split(',')
            splitDataURI.pop()
            return {}
        }
    }

    readWorkbook(excelWorkbook: Excel.Workbook, column?: string | number, worksheetName?: string): ExcelFileData {
        let targetWorksheet: Excel.Worksheet | undefined

        // Find the target worksheet
        if (worksheetName) {
            targetWorksheet = excelWorkbook.getWorksheet(worksheetName)
            if (!targetWorksheet) {
                throw new Error(`Worksheet "${worksheetName}" not found in the Excel file`)
            }
        } else {
            // Use the first worksheet if no name specified
            targetWorksheet = excelWorkbook.worksheets[0]
        }

        if (!targetWorksheet) {
            throw new Error('No worksheet found in the Excel file')
        }

        // If column is specified, extract only that column
        if (column !== undefined) {
            return this.extractSingleColumn(targetWorksheet, column)
        }

        // FIXED LOGIC: Process worksheets based on whether worksheetName is specified
        const worksheets: Worksheet[] = []

        if (worksheetName) {
            // Only process the specified worksheet
            const worksheetObj = new Worksheet(targetWorksheet.name, [])
            targetWorksheet.eachRow((row) => {
                row.eachCell((cell) => {
                    const cellObj = Cell.fromExcelCell(cell)
                    // Convert all cell values to strings for consistency
                    if ((cellObj as any).value !== undefined && (cellObj as any).value !== null) {
                        ;(cellObj as any).value = (cellObj as any).value.toString()
                    }
                    worksheetObj.cells.push(cellObj)
                })
            })
            worksheets.push(worksheetObj)
        } else {
            // Process all worksheets when no specific worksheet is specified
            excelWorkbook.eachSheet((worksheet) => {
                const worksheetObj = new Worksheet(worksheet.name, [])
                worksheet.eachRow((row) => {
                    row.eachCell((cell) => {
                        const cellObj = Cell.fromExcelCell(cell)
                        // Convert all cell values to strings for consistency
                        if ((cellObj as any).value !== undefined && (cellObj as any).value !== null) {
                            ;(cellObj as any).value = (cellObj as any).value.toString()
                        }
                        worksheetObj.cells.push(cellObj)
                    })
                })
                worksheets.push(worksheetObj)
            })
        }

        return worksheets
    }

    extractSingleColumn(worksheet: Excel.Worksheet, column: string | number): SingleColumnData {
        const columnValues: string[] = []
        let columnIndex: number
        let headers: string[] = []

        // Get headers from first row
        const firstRow = worksheet.getRow(1)
        firstRow.eachCell((cell, colNumber) => {
            const cellText = cell.text || cell.value?.toString() || ''
            headers[colNumber] = cellText.trim()
        })

        // Clean up headers array - remove undefined/empty entries and get valid headers
        const validHeaders = headers.filter((header) => header && header.trim() !== '')

        // Determine column index
        if (typeof column === 'number') {
            // Column specified by index (0-based, but Excel is 1-based)
            columnIndex = column + 1
        } else {
            // Column specified by name - find the matching header
            const headerIndex = headers.findIndex((header) => {
                // Safety check: make sure header exists and is a string
                if (!header || typeof header !== 'string') {
                    return false
                }
                return header.toLowerCase().trim() === column.toLowerCase().trim()
            })

            if (headerIndex === -1) {
                const availableColumns = validHeaders.length > 0 ? validHeaders.join(', ') : 'No named columns found'
                throw new Error(`Column "${column}" not found. Available columns: ${availableColumns}`)
            }
            columnIndex = headerIndex
        }

        // Validate column index
        if (columnIndex < 1 || columnIndex >= headers.length) {
            const maxIndex = Math.max(0, validHeaders.length - 1)
            throw new Error(`Column index out of range. Available column indices: 0-${maxIndex}`)
        }

        // Extract values from the specified column (skip header row)
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) return // Skip header row

            const cell = row.getCell(columnIndex)
            const cellValue = cell.text || cell.value?.toString() || ''

            if (cellValue.trim()) {
                // Only add non-empty values
                columnValues.push(cellValue.trim())
            }
        })

        return {
            columnName: headers[columnIndex] || `Column ${columnIndex}`,
            values: columnValues,
            worksheetName: worksheet.name,
            totalRows: columnValues.length
        }
    }

    async init?(nodeData: INodeData, _: string, options: ICommonObject): Promise<any> {
        const metadata = nodeData.inputs?.metadata
        const output = nodeData.outputs?.output as string
        const _omitMetadataKeys = nodeData.inputs?.omitMetadataKeys as string
        const column = nodeData.inputs?.column as string
        const worksheetName = nodeData.inputs?.worksheetName as string

        let docs: IDocument[] = []

        const chatflowid = options.chatflowid

        const { files, fromStorage } = this.getFiles(nodeData)

        // Parse column input - could be string name or numeric index
        let parsedColumn: string | number | undefined = undefined
        if (column && column.trim()) {
            const trimmedColumn = column.trim()
            // Check if it's a number
            const numericColumn = parseInt(trimmedColumn)
            if (!isNaN(numericColumn)) {
                parsedColumn = numericColumn
            } else {
                parsedColumn = trimmedColumn
            }
        }

        for (const file of files) {
            if (!file) continue

            const fileData: ExcelFileData = await this.getFileData(file, { chatflowid }, fromStorage, parsedColumn, worksheetName)

            if (output === 'json') return fileData

            // Type guard to check if this is single column data
            const isSingleColumnData = (data: ExcelFileData): data is SingleColumnData => {
                return typeof data === 'object' && data !== null && 'values' in data && Array.isArray((data as any).values)
            }

            // Handle single column data differently
            if (parsedColumn !== undefined && isSingleColumnData(fileData)) {
                // Create documents from individual column values
                const columnDocs = fileData.values.map((value: string, index: number) => ({
                    pageContent: value,
                    metadata: {
                        source: file,
                        column: fileData.columnName,
                        worksheet: fileData.worksheetName,
                        row: index + 2, // +2 because we skip header and use 1-based indexing
                        ...metadata
                    }
                }))
                docs = [...docs, ...columnDocs]
            } else {
                // Original behavior for full data or single worksheet data
                const buffer = Buffer.from(JSON.stringify(fileData, this.replacer), 'utf-8')
                const blob = new Blob([buffer])
                const loader = new JSONLoader(blob)

                docs = [...docs, ...(await handleDocumentLoaderDocuments(loader, undefined))]
            }
        }

        docs = handleDocumentLoaderMetadata(docs, _omitMetadataKeys, metadata)

        return handleDocumentLoaderOutput(docs, output)
    }

    protected replacer(key: any, value: any) {
        if (value instanceof Map) {
            return {
                dataType: 'Map',
                value: Array.from(value.entries())
            }
        } else {
            return value
        }
    }
}

module.exports = { nodeClass: Excel_DocumentLoader }
