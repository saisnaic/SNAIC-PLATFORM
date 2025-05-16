export interface IValueObject {
    value: string | number | boolean | Date | null | undefined
}

export class NullValue implements IValueObject {
    value: null = null
}

export class MergeValue implements IValueObject {
    value: string | number | boolean | Date | null | undefined

    constructor() {}
}

export class NumberValue implements IValueObject {
    value: number
    constructor(value: number) {
        this.value = value
    }
}

export class StringValue implements IValueObject {
    value: string
    constructor(value: string) {
        this.value = value
    }
}

export class DateValue implements IValueObject {
    value: Date
    constructor(value: Date) {
        this.value = value
    }
}

export class HyperlinkValue implements IValueObject {
    value: string | number | boolean | Date | null | undefined
}

export class FormulaValue implements IValueObject {
    value: string | number | boolean | Date | null | undefined
}

export class RichTextValue implements IValueObject {
    value: string | number | boolean | Date | null | undefined
}

export class BooleanValue implements IValueObject {
    value: boolean

    constructor(value: boolean) {
        this.value = value
    }
}
export class ErrorValue implements IValueObject {
    value: string | number | boolean | Date | null | undefined
}
