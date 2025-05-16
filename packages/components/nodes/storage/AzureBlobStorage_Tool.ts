import { BlobServiceClient } from '@azure/storage-blob'
import { IStorageProvider } from '../../src'

export class AzureBlobStorage_Tool implements IStorageProvider {
    blobServiceClient: BlobServiceClient
    container: string

    constructor(blobService: BlobServiceClient, container: string) {
        this.blobServiceClient = blobService
        this.container = container
    }

    async writeFile(file: string, data: any): Promise<boolean> {
        const containerClient = this.blobServiceClient.getContainerClient(this.container)
        await containerClient.createIfNotExists()
        const blockBlobClient = containerClient.getBlockBlobClient(file)
        await blockBlobClient.uploadData(data)
        return true
    }
}
