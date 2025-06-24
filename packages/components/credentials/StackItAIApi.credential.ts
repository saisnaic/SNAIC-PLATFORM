import { INodeParams, INodeCredential } from '../src'

class StackItAIApiCredential implements INodeCredential {
    label: string
    name: string
    version: number
    description: string
    inputs: INodeParams[]

    constructor() {
        this.label = 'StackIT AI Api Credential'
        this.name = 'stackitAIApiCredential'
        this.version = 1.0
        this.description = 'Credentials to connect to StackIT`s shared AI models API'
        this.inputs = [
            {
                label: 'StackIT API Token',
                name: 'stackitAPIToken',
                type: 'password'
            },
            {
                label: 'StackIT API Endpoint',
                name: 'stackitAPIEndpoint',
                type: 'string',
                optional: true,
                placeholder: 'https://api.openai-compat.model-serving.eu01.onstackit.cloud/v1',
                default: 'https://api.openai-compat.model-serving.eu01.onstackit.cloud/v1'
            }
        ]
    }
}

module.exports = { credClass: StackItAIApiCredential }
