import { Cell } from './Cell'

export class Worksheet {
    name: string
    cells: Cell[]

    constructor(name: string, cells: Cell[]) {
        this.name = name
        this.cells = cells ?? []
    }
}
