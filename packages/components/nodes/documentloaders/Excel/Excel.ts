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
        this.version = 0.2
        this.type = 'Document'
        this.icon = 'excel.svg'
        this.category = 'Document Loaders'
        this.description = `Load data from Excel files`
        this.baseClasses = [this.type]
        this.inputs = [
            {
                label: 'Excel File',
                name: 'excelFile',
                type: 'file',
                fileType: '.xlsx'
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

    async getFileData(file: string, { chatflowid }: { chatflowid: string }, fromStorage?: boolean) {
        if (fromStorage) {
            const fileData = await getFileFromStorage(file, chatflowid)
            const excelWorkBook = new Excel.Workbook()
            await excelWorkBook.xlsx.read(Readable.from(fileData))
            return this.readWorkbook(excelWorkBook)
        } else {
            const splitDataURI = file.split(',')
            splitDataURI.pop()
            return {}
        }
    }

    readWorkbook(excelWorkbook: Excel.Workbook) {
        const worksheets: Worksheet[] = []
        excelWorkbook.eachSheet((worksheet) => {
            const worksheetObj = new Worksheet(worksheet.name, [])
            worksheet.eachRow((row) => {
                row.eachCell((cell) => {
                    const cellObj = Cell.fromExcelCell(cell)
                    worksheetObj.cells.push(cellObj)
                })
            })
            worksheets.push(worksheetObj)
        })

        // return JSON.stringify(worksheets, replacer)
        return worksheets
    }

    async init?(nodeData: INodeData, _: string, options: ICommonObject): Promise<any> {
        const metadata = nodeData.inputs?.metadata
        const output = nodeData.outputs?.output as string
        const _omitMetadataKeys = nodeData.inputs?.omitMetadataKeys as string

        let docs: IDocument[] = []

        const chatflowid = options.chatflowid

        const { files, fromStorage } = this.getFiles(nodeData)
        let fileData

        for (const file of files) {
            if (!file) continue

            fileData = await this.getFileData(file, { chatflowid }, fromStorage)

            if (output === 'json') return fileData

            const buffer = Buffer.from(JSON.stringify(fileData, this.replacer), 'utf-8')
            const blob = new Blob([buffer])
            const loader = new JSONLoader(blob)

            // use spread instead of push, because it raises RangeError: Maximum call stack size exceeded when too many docs
            docs = [...docs, ...(await handleDocumentLoaderDocuments(loader, undefined))]
        }

        docs = handleDocumentLoaderMetadata(docs, _omitMetadataKeys, metadata)

        return handleDocumentLoaderOutput(docs, output)
    }

    protected replacer(key: any, value: any) {
        if (value instanceof Map) {
            return {
                dataType: 'Map',
                value: Array.from(value.entries()) // or with spread: value: [...value]
            }
        } else {
            return value
        }
    }
}

module.exports = { nodeClass: Excel_DocumentLoader }
