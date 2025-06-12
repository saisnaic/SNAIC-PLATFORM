# Flowise VectorStore to Document Node

This custom Flowise node enables conversion of vector store data into structured documents, allowing you to integrate vectorized data into Flowise pipelines.

---

![VectorStore to Document Loader](vectorretriever.svg)

# How to use VectorStore to Document Node

-   **Vector Store Path**: Provide the path to the vector store.
-   **Output Format**: Specify the desired output format (e.g., plain text, JSON).
-   **Output**: The output will be the converted documents from the vector store.

---

# Usecase

---

## Quickstart to create VectorStore to Document Node in Flowise

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd flowise-vectorstore-to-document-node
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
    "vectorStorePath": "path/to/vector-store",
    "outputFormat": "plainText"
}
```

Output: The converted documents from the vector store.

---

## Project Structure

| File                       | Description                                                   |
| -------------------------- | ------------------------------------------------------------- |
| `VectorStoreToDocument.ts` | Entry point, orchestrates vector store to document conversion |

### Detailed Explanation: `VectorStoreToDocument.ts`

This module acts as the central orchestrator for converting vector store data into documents.

-   Accepts Flowise-style input with vector store path and output format.
-   Converts the vectorized data into structured documents.
-   Outputs the converted documents in the specified format.

---

## Testing

We recommend using [Vitest](https://vitest.dev/) or Jest:

```ts
import { describe, it, expect } from 'vitest'

describe('VectorStoreToDocument', () => {
    it('should convert vector store data to documents', () => {
        const vectorStoreToDocument = new VectorStoreToDocument()
        const result = vectorStoreToDocument.convert('path/to/vector-store', 'plainText')
        expect(result).toBeInstanceOf(Array)
    })
})
```

---

## Extendability

You can extend this node by:

-   Adding support for additional vector store formats.
-   Enabling advanced conversion options like filtering or sorting.
-   Supporting streaming for large vector store data.

---
