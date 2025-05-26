import { ICommonObject, INode, INodeData, INodeParams } from '../../../src'

class JPathFilter_Tools implements INode {
    label: string
    name: string
    version: number
    description: string
    type: string
    icon: string
    category: string
    baseClasses: string[]
    inputs: INodeParams[]

    constructor() {
        this.label = 'JPath Filter'
        this.name = 'j-path-filter'
        this.version = 0.1
        this.type = 'PathFilter'
        this.icon = 'pathfilter.svg'
        this.category = 'Tools'
        this.description = `Filtering a JSON by a given JPath object`
        this.inputs = [
            {
                label: 'JSON',
                name: 'json',
                type: 'json',
                description: 'Insert the element with the key `json` property`',
                acceptVariable: true
            },
            {
                label: 'JPath',
                name: 'jpath',
                description: 'JPath object to JSON',
                type: 'string'
            }
        ]
        this.baseClasses = ['json']
    }

    async init(nodeData: INodeData, _: string, __: ICommonObject): Promise<string> {
        const json = nodeData.inputs?.json as string
        const jpath = nodeData.inputs?.jpath as string
        const jsonInputAsJson = JSON.parse(json)
        const elementJsonString = jsonInputAsJson['json']
        const element = JSON.parse(elementJsonString)
        const jp = require('jsonpath')
        return jp.query(element, jpath)
    }
}

module.exports = { nodeClass: JPathFilter_Tools }
