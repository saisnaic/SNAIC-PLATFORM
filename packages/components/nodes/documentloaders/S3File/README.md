# Flowise S3 File Node

This custom Flowise node enables integration with Amazon S3, allowing you to fetch and process individual files from an S3 bucket for use in Flowise pipelines.

---

![S3 File Loader](s3.svg)

# How to use S3 File Node

-   **Bucket Name**: Provide the name of the S3 bucket.
-   **File Path**: Specify the path to the file within the bucket.
-   **Output**: The output will be the content of the file, formatted as JSON.

---

# Usecase

---

## Quickstart to create S3 File Node in Flowise

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd flowise-s3-file-node
pnpm install
```

### 2. Build & Run Locally

```bash
pnpm build
pnpm dev
```

### 3. Use in Flowise

Add the node to your Flowise UI as a custom node. Input data must include:

```json
{
    "bucketName": "your-bucket-name",
    "filePath": "path/to/file"
}
```

Output: The JSON content of the specified S3 file.

---

## Project Structure

| File        | Description                                  |
| ----------- | -------------------------------------------- |
| `S3File.ts` | Entry point, orchestrates S3 file processing |

### Detailed Explanation: `S3File.ts`

This module acts as the central orchestrator for processing individual files in an S3 bucket.

-   Accepts Flowise-style input with bucket name and file path.
-   Fetches the specified file.
-   Outputs the content of the file as JSON.

---

## Testing

We recommend using [Vitest](https://vitest.dev/) or Jest:

```ts
import { describe, it, expect } from 'vitest'

describe('S3File', () => {
    it('should fetch file from S3 bucket', async () => {
        const s3File = new S3File()
        const result = await s3File.fetchFile('your-bucket-name', 'path/to/file')
        expect(result).toBeInstanceOf(Object)
    })
})
```

---

## Extendability

You can extend this node by:

-   Adding support for additional S3 operations.
-   Enabling advanced filtering options.
-   Supporting streaming for large files.

---
