# Flowise Custom Document Loader Node

This custom Flowise node enables loading and processing of custom document formats, allowing you to integrate non-standard document types into Flowise pipelines.

---

![Custom Document Loader](customDocLoader.svg)

# How to use Custom Document Loader Node

-   **File Path**: Provide the path to the custom document file.
-   **Parser Options**: Specify options for parsing the custom document format.
-   **Output**: The output will be the parsed content of the document, formatted as JSON.

---

# Usecase

---

## Quickstart to create Custom Document Loader Node in Flowise

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd flowise-custom-doc-loader-node
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
    "filePath": "path/to/your/custom-document",
    "parserOptions": {
        "option1": "value1",
        "option2": "value2"
    }
}
```

Output: The JSON content of the custom document.

---

## Project Structure

| File                      | Description                                       |
| ------------------------- | ------------------------------------------------- |
| `CustomDocumentLoader.ts` | Entry point, orchestrates custom document parsing |

### Detailed Explanation: `CustomDocumentLoader.ts`

This module acts as the central orchestrator for parsing custom document formats.

-   Accepts Flowise-style input with file path and parser options.
-   Parses the custom document using the specified options.
-   Outputs the parsed content as JSON.

---

## Testing

We recommend using [Vitest](https://vitest.dev/) or Jest:

```ts
import { describe, it, expect } from 'vitest'

describe('CustomDocumentLoader', () => {
    it('should parse custom document content', () => {
        const loader = new CustomDocumentLoader()
        const result = loader.parse('path/to/custom-document', { option1: 'value1' })
        expect(result).toBeInstanceOf(Object)
    })
})
```

---

## Extendability

You can extend this node by:

-   Adding support for additional custom document formats.
-   Enabling advanced parsing options.
-   Supporting streaming for large documents.

---
