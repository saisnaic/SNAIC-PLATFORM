# Flowise S3 Directory Node

This custom Flowise node enables integration with Amazon S3, allowing you to fetch and process files from an S3 directory for use in Flowise pipelines.

---

![S3 Directory Loader](s3.svg)

# How to use S3 Directory Node

-   **Bucket Name**: Provide the name of the S3 bucket.
-   **Directory Path**: Specify the path to the directory within the bucket.
-   **Output**: The output will be the content of the files in the directory, formatted as JSON.

---

# Usecase

---

## Quickstart to create S3 Directory Node in Flowise

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd flowise-s3-directory-node
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
    "directoryPath": "path/to/directory"
}
```

Output: The JSON content of the files in the specified S3 directory.

---

## Project Structure

| File             | Description                                       |
| ---------------- | ------------------------------------------------- |
| `S3Directory.ts` | Entry point, orchestrates S3 directory processing |

### Detailed Explanation: `S3Directory.ts`

This module acts as the central orchestrator for processing files in an S3 directory.

-   Accepts Flowise-style input with bucket name and directory path.
-   Fetches the files in the specified directory.
-   Outputs the content of the files as JSON.

---

## Testing

We recommend using [Vitest](https://vitest.dev/) or Jest:

```ts
import { describe, it, expect } from 'vitest'

describe('S3Directory', () => {
    it('should fetch files from S3 directory', async () => {
        const s3Directory = new S3Directory()
        const result = await s3Directory.fetchFiles('your-bucket-name', 'path/to/directory')
        expect(result).toBeInstanceOf(Array)
    })
})
```

---

## Extendability

You can extend this node by:

-   Adding support for additional S3 operations.
-   Enabling advanced filtering options.
-   Supporting recursive directory processing.

---
