export class Cell_Style_Fill {
    type: string
    pattern: string
    fgColor: string
    bgColor: string

    constructor(type: string, pattern: string, fgColor: string, bgColor: string) {
        this.type = type
        this.pattern = pattern
        this.fgColor = fgColor
        this.bgColor = bgColor
    }
}
