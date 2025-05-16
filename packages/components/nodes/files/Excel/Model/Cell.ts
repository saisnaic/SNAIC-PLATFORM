import { Cell_Style } from './Cell_Style'
import { Cell_Style_Font } from './Cell_Style_Font'
import { Cell_Style_Fill } from './Cell_Style_Fill'
import { BooleanValue, IValueObject, NullValue, NumberValue, StringValue } from './Values/ValueObjects'
import Excel from 'exceljs'

export class Cell {
    address: string
    cellStyle: Cell_Style | undefined
    cellValue: IValueObject

    static fromExcelCell(excelCell: Excel.Cell) {
        const cell = new Cell()
        cell.address = excelCell.address
        const fill = this.createFilling(excelCell.fill)
        cell.cellStyle = new Cell_Style(
            new Cell_Style_Font(
                excelCell.font?.size,
                excelCell.font?.name,
                excelCell.font?.family,
                excelCell.font?.underline,
                excelCell.font?.bold,
                excelCell.font?.italic
            ),
            fill
        )

        const valueType = typeof excelCell.value
        switch (valueType) {
            case 'undefined':
                cell.cellValue = new NullValue()
                break
            /*case 1:
                cell.cellValue = new MergeValue()
                break*/
            case 'number':
                cell.cellValue = new NumberValue(excelCell.value as number)
                break
            case 'string':
                cell.cellValue = new StringValue(excelCell.value as string)
                break
            /*case 4:
                cell.cellValue = new DateValue(excelCell.value)
                break
            case 5:
                cell.cellValue = new HyperlinkValue()
                break
            case 8:
                cell.cellValue = new RichTextValue()
                break*/
            case 'boolean':
                cell.cellValue = new BooleanValue(excelCell.value as boolean)
                break
            /*case 10:
                cell.cellValue = new ErrorValue()
                break*/
        }

        return cell
    }

    static createFilling(fillObj: any) {
        if (!fillObj) {
            return undefined
        }

        const type = fillObj.type
        let pattern: string = ''
        let fgColor: string = ''
        let bgColor: string = ''

        switch (type) {
            case 'pattern':
                pattern = fillObj.pattern
                fgColor = fillObj.fgColor?.theme
                bgColor = fillObj.bgColor?.indexed
                break
            case 'gradient':
                break
        }

        return new Cell_Style_Fill(type, pattern ?? undefined, fgColor ?? undefined, bgColor ?? undefined)
    }
}
