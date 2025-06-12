# Flowise Document Store Node

This custom Flowise node enables integration with document stores, allowing you to fetch and process documents stored in external systems for use in Flowise pipelines.

---

![Document Store Loader](dstore.svg)

# How to use Document Store Node

-   **Store URL**: Provide the URL of the document store.
-   **Query**: Specify the query to fetch documents.
-   **Output**: The output will be the fetched documents, formatted as JSON.

---

# Usecase

---

## Quickstart to create Document Store Node in Flowise

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd flowise-document-store-node
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
    "storeUrl": "https://example.com/document-store",
    "query": "SELECT * FROM documents WHERE type='report'"
}
```

Output: The JSON content of the fetched documents.

---

## Project Structure

| File                | Description                                      |
| ------------------- | ------------------------------------------------ |
| `DocStoreLoader.ts` | Entry point, orchestrates document store queries |

### Detailed Explanation: `DocStoreLoader.ts`

This module acts as the central orchestrator for querying document stores.

-   Accepts Flowise-style input with store URL and query.
-   Fetches documents from the specified store using the query.
-   Outputs the fetched documents as JSON.

---

## Testing

We recommend using [Vitest](https://vitest.dev/) or Jest:

```ts
import { describe, it, expect } from 'vitest'

describe('DocStoreLoader', () => {
    it('should fetch documents from store', async () => {
        const loader = new DocStoreLoader()
        const result = await loader.query('https://example.com/document-store', 'SELECT * FROM documents')
        expect(result).toBeInstanceOf(Array)
    })
})
```

---

## Extendability

You can extend this node by:

-   Adding support for additional query languages.
-   Enabling advanced filtering or sorting options.
-   Supporting multiple document stores.

---
