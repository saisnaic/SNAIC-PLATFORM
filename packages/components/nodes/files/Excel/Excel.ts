import { ICommonObject, INode, INodeData, INodeOutputsValue, INodeParams } from '../../../src'
import { Worksheet } from './Model/Worksheet'
import { getRows } from './Model/utils'
import Excel from 'exceljs'
import { IStorageProvider } from '../../../src'

class Excel_Files implements INode {
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
        this.label = 'Excel Writer'
        this.name = 'excelWriter'
        this.version = 0.1
        this.type = 'json'
        this.icon = 'excel.svg'
        this.category = 'File Creation'
        this.description = `Write data to Excel files`
        this.baseClasses = [this.type]
        this.inputs = [
            {
                label: 'Storage Provider',
                name: 'storageProvider',
                type: 'IStorageProvider'
            },
            {
                label: 'Excel JSON',
                name: 'excelJson',
                type: 'json',
                acceptVariable: true,
                list: true
            },
            {
                label: 'File path',
                name: 'filePath',
                type: 'string'
            }
        ]
        this.outputs = [
            {
                label: 'Ending Node',
                name: 'EndingNode',
                baseClasses: [this.type]
            }
        ]
    }

    writeWorkbook(jsonExcel: string) {
        let worksheets: Worksheet[] = []
        worksheets = Object.assign(worksheets, JSON.parse(jsonExcel))
        const excelWorkbook = new Excel.Workbook()
        for (let worksheet of worksheets) {
            const excelWorksheet = excelWorkbook.addWorksheet(worksheet.name)
            const orderedRows = getRows(worksheet.cells)
            for (const cells of Object.values(orderedRows)) {
                for (const cell of cells) {
                    excelWorksheet.getCell(cell.address).value = cell.cellValue.value
                }
            }
        }

        return excelWorkbook
    }

    async init?(nodeData: INodeData, _: string, __: ICommonObject): Promise<any> {
        const storageProvider = nodeData.inputs?.storageProvider as IStorageProvider
        const excelJsonInput = nodeData.inputs?.excelJson as string

        const jsonInputAsJson = JSON.parse(excelJsonInput)

        const excelJsonString = jsonInputAsJson['excel']

        const filePath = nodeData.inputs?.filePath as string

        const workbook = this.writeWorkbook(excelJsonString)
        const workbookBuffer = await workbook.xlsx.writeBuffer()
        await storageProvider.writeFile(filePath, workbookBuffer)
    }
}

module.exports = { nodeClass: Excel_Files }
