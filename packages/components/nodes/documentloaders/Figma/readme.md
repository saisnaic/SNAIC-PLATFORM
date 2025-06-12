# Flowise Figma Node

This custom Flowise node enables integration with Figma, allowing you to fetch and process design data from Figma files for use in Flowise pipelines.

---

![Figma Loader](figma.svg)

# How to use Figma Node

-   **API Key**: Provide your Figma API key for authentication.
-   **File ID**: Specify the ID of the Figma file to fetch.
-   **Output**: The output will be the design data, formatted as JSON.

---

# Usecase

---

## Quickstart to create Figma Node in Flowise

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd flowise-figma-node
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
    "apiKey": "your-api-key",
    "fileId": "your-file-id"
}
```

Output: The JSON content of the Figma file.

---

## Project Structure

| File       | Description                                  |
| ---------- | -------------------------------------------- |
| `Figma.ts` | Entry point, orchestrates Figma API requests |

### Detailed Explanation: `Figma.ts`

This module acts as the central orchestrator for fetching data from Figma.

-   Accepts Flowise-style input with API key and file ID.
-   Fetches the specified Figma file.
-   Outputs the file content as JSON.

---

## Testing

We recommend using [Vitest](https://vitest.dev/) or Jest:

```ts
import { describe, it, expect } from 'vitest'

describe('Figma', () => {
    it('should fetch file content from Figma', async () => {
        const figma = new Figma('your-api-key')
        const fileContent = await figma.fetchFile('your-file-id')
        expect(fileContent).toBeInstanceOf(Object)
    })
})
```

---

## Extendability

You can extend this node by:

-   Adding support for additional Figma API endpoints.
-   Enabling advanced filtering or formatting of design data.
-   Supporting multiple file fetches in parallel.

---
