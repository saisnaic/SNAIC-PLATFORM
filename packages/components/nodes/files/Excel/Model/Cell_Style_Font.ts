export class Cell_Style_Font {
    size?: number
    name?: string
    family?: number
    underline?: boolean | 'none' | 'single' | 'double' | 'singleAccounting' | 'doubleAccounting' | undefined
    bold?: boolean
    italic?: boolean

    constructor(
        size?: number,
        name?: string,
        family?: number,
        underline?: boolean | 'none' | 'single' | 'double' | 'singleAccounting' | 'doubleAccounting' | undefined,
        bold?: boolean,
        italic?: boolean
    ) {
        this.size = size
        this.name = name
        this.family = family
        this.underline = underline
        this.bold = bold
        this.italic = italic
    }
}
