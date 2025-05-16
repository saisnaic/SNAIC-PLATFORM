import { INodeParams, INodeCredential } from '../src'

class AzureBlobStorageApi implements INodeCredential {
    label: string
    name: string
    version: number
    description: string
    inputs: INodeParams[]

    constructor() {
        this.label = 'Azure BlobStorage API'
        this.name = 'azureBlobStorageApi'
        this.version = 1.0
        this.inputs = [
            {
                label: 'Azure Blob Account Name',
                name: 'azureBlobAccountName',
                type: 'string'
            },
            {
                label: 'Azure Client Id',
                name: 'azureClientId',
                type: 'string',
                placeholder: 'clientId-GUID'
            },
            {
                label: 'Azure Tenant Id',
                name: 'azureTenantId',
                type: 'string',
                placeholder: 'Tenant-Id'
            },
            {
                label: 'Azure Client Secret',
                name: 'azureClientSecret',
                type: 'password',
                placeholder: 'your secret'
            }
        ]
    }
}

module.exports = { credClass: AzureBlobStorageApi }
