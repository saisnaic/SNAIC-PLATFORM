import { ChatflowTool } from '../ChatflowTool/ChatflowTool'

import {
    getCredentialData,
    getCredentialParam,
    ICommonObject,
    IDatabaseEntity,
    INode,
    INodeData,
    INodeOptionsValue,
    INodeOutputsValue,
    INodeParams
} from '../../../src'
import { DataSource } from 'typeorm'

class Loop_Tools implements INode {
    label: string
    name: string
    version: number
    description: string
    type: string
    icon: string
    category: string
    baseClasses: string[]
    credential: INodeParams
    inputs: INodeParams[]
    outputs: INodeOutputsValue[]

    constructor() {
        this.label = 'Loop Tool'
        this.name = 'LoopTool'
        this.version = 0.1
        this.type = 'LoopTool'
        this.icon = 'looptool.svg'
        this.category = 'Tools'
        this.description =
            'Use as a tool to loop through a JSON with a select-function, perform a sub-chatflow on elements and perform an aggregate-function on the results'
        this.baseClasses = [this.type, 'Tool']
        this.inputs = [
            {
                label: 'JSON Input',
                type: 'json',
                name: 'jsonInput',
                acceptVariable: true,
                description: 'Insert the JSON object as a property of `loop`',
                list: true
            },
            {
                label: 'Selector',
                name: 'selector',
                type: 'string',
                rows: 4,
                placeholder: `$.phoneNumbers[:1].type`
            },
            {
                default: false,
                description:
                    'If the JPath returns an array collection it will be iterated and the single objects will be used for the sub flow. Otherwise the whole array will be the input',
                label: 'Iterate array',
                name: 'iterateArray',
                optional: true,
                type: 'boolean'
            },
            {
                label: 'Select Chatflow',
                name: 'selectedChatflow',
                type: 'asyncOptions',
                loadMethod: 'listChatflows'
            },
            {
                label: 'Return Direct',
                name: 'returnDirect',
                type: 'boolean',
                optional: true
            },
            {
                label: 'Aggregate',
                name: 'aggregate',
                type: 'string'
            }
        ]
        this.outputs = [
            {
                label: 'JSON Output',
                name: 'jsonOutput',
                description: 'JSON defined by the aggregate function',
                baseClasses: ['string', 'json']
            }
        ]
    }

    //@ts-ignore
    loadMethods = {
        async listChatflows(_: INodeData, options: ICommonObject): Promise<INodeOptionsValue[]> {
            const returnData: INodeOptionsValue[] = []

            const appDataSource = options.appDataSource as DataSource
            const databaseEntities = options.databaseEntities as IDatabaseEntity
            if (appDataSource === undefined || !appDataSource) {
                return returnData
            }

            const chatflows = await appDataSource.getRepository(databaseEntities['ChatFlow']).find()

            for (let i = 0; i < chatflows.length; i += 1) {
                const data = {
                    label: chatflows[i].name,
                    name: chatflows[i].id
                } as INodeOptionsValue
                returnData.push(data)
            }
            return returnData
        }
    }

    async init(nodeData: INodeData, input: string, options: ICommonObject): Promise<any> {
        const jsonInput = nodeData.inputs?.jsonInput as string
        const jsonInputAsJson = JSON.parse(jsonInput)
        const loopJsonString = jsonInputAsJson['loop']
        const loopJson = JSON.parse(loopJsonString)

        const selector = nodeData.inputs?.selector as string

        const jp = require('jsonpath')
        const queried = jp.query(loopJson, selector)

        const results = await this.processInput(queried, nodeData, options)

        const aggregate = nodeData.inputs?.aggregate as string
        return results
    }

    async processInput(input: any, nodeData: INodeData, options: ICommonObject): Promise<any> {
        const selectedChatflowId = nodeData.inputs?.selectedChatflow as string
        const returnDirect = nodeData.inputs?.returnDirect as boolean
        const baseURL = options.baseURL as string
        const name = nodeData.inputs?.name as string
        const description = nodeData.inputs?.description as string
        const iterateArray = nodeData.inputs?.iterateArray as boolean

        const credentialData = await getCredentialData(nodeData.credential ?? '', options)
        const chatflowApiKey = getCredentialParam('chatflowApiKey', credentialData, nodeData)

        if (selectedChatflowId === options.chatflowid) throw new Error('Cannot call the same chatflow!')

        let headers = {}
        if (chatflowApiKey) headers = { Authorization: `Bearer ${chatflowApiKey}` }

        if (Array.isArray(input) && iterateArray) {
            let results: any[] = []
            for (let index = 0; index < input.length; index += 1) {
                const elementAtIndex = input[index]
                const arrayInput = JSON.stringify(elementAtIndex)
                const chatflowTool = new ChatflowTool({
                    name,
                    baseURL,
                    description,
                    returnDirect,
                    chatflowid: selectedChatflowId,
                    startNewSession: true,
                    headers,
                    input: arrayInput,
                    overrideConfig: undefined
                })
                const result = await chatflowTool.call({ input: arrayInput })
                results.push(result)
            }

            return results
        } else {
            const callInput = JSON.stringify(input)
            const chatflowTool = new ChatflowTool({
                name,
                baseURL,
                description,
                returnDirect,
                chatflowid: selectedChatflowId,
                startNewSession: true,
                headers,
                input: callInput,
                overrideConfig: undefined
            })
            return await chatflowTool.call({ input: callInput })
        }
    }
}

module.exports = { nodeClass: Loop_Tools }
