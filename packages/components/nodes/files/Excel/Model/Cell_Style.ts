import { Cell_Style_Font } from './Cell_Style_Font'
import { Cell_Style_Fill } from './Cell_Style_Fill'

export class Cell_Style {
    font: Cell_Style_Font
    fill: Cell_Style_Fill | undefined

    constructor(font: Cell_Style_Font, fill: Cell_Style_Fill | undefined) {
        this.font = font
        this.fill = fill
    }
}
