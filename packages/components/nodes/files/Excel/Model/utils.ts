import { Cell } from './Cell'

export function getRows(cells: Cell[]) {
    const sortedByRows = groupBy(cells, (cell) => getRowNumber(cell.address))
    for (const key of Object.keys(sortedByRows)) {
        const row = sortedByRows[key]
        sortedByRows[key] = row.sort((a, b) => getColumn(a.address).localeCompare(getColumn(b.address)))
    }

    return sortedByRows
}

function getRowNumber(cellAddress: string) {
    const replace = cellAddress.replace(/[a-zA-Z]+/g, '')
    return +replace
}

function getColumn(cellAddress: string): string {
    return cellAddress.replace(/\\d/g, '')
}

function groupBy<T>(list: T[], keyGetter: (item: T) => string | number): { [key: string | number]: T[] } {
    const map = new Map<string | number, T[]>()
    list.forEach((item) => {
        const key = keyGetter(item)
        const collection = map.get(key)
        if (collection) {
            collection.push(item)
        } else {
            map.set(key, [item])
        }
    })
    return Object.fromEntries(map)
}
