import { getCredentialData, getCredentialParam, ICommonObject, INode, INodeData, INodeParams } from '../../src'

import { BlobServiceClient } from '@azure/storage-blob'

import { ClientSecretCredential } from '@azure/identity'

import { AzureBlobStorage_Tool } from './AzureBlobStorage_Tool'

class AzureBlobStorage_Storage implements INode {
    label: string
    name: string
    version: number
    type: string
    icon: string
    category: string
    description: string
    baseClasses: string[]
    credential: INodeParams
    inputs: INodeParams[]

    constructor() {
        this.label = 'Azure Blob Storage'
        this.name = 'azureBlobStorage'
        this.version = 0.1
        this.type = 'AzureBlobStorage'
        this.icon = 'Azure.svg'
        this.category = 'Storage'
        this.description = 'Wrapper around Azure Blob Storage to access its data'
        this.baseClasses = [this.type, 'IStorageProvider']
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['azureBlobStorageApi']
        }
        this.inputs = [
            {
                label: 'Container',
                name: 'container',
                type: 'string'
            }
        ]
    }

    async init(nodeData: INodeData, _: string, options: ICommonObject): Promise<any> {
        const credentialData = await getCredentialData(nodeData.credential ?? '', options)
        const account = getCredentialParam('azureBlobAccountName', credentialData, nodeData)
        const clientId = getCredentialParam('azureClientId', credentialData, nodeData)
        const tenantId = getCredentialParam('azureTenantId', credentialData, nodeData)
        const clientSecret = getCredentialParam('azureClientSecret', credentialData, nodeData)

        const container = nodeData.inputs?.container?.toLowerCase() ?? 'general'

        const azureCredentials = new ClientSecretCredential(tenantId, clientId, clientSecret)

        return new AzureBlobStorage_Tool(new BlobServiceClient(`https://${account}.blob.core.windows.net`, azureCredentials), container)
    }
}
module.exports = { nodeClass: AzureBlobStorage_Storage }
