# Flowise DOCX Node

This custom Flowise node enables loading and processing of DOCX files, allowing you to extract structured data from Word documents for use in Flowise pipelines.

---

![DOCX Loader](docx.svg)

# How to use DOCX Node

-   **File Path**: Provide the path to the DOCX file.
-   **Output Format**: Specify the desired output format (e.g., plain text, JSON).
-   **Output**: The output will be the extracted content of the DOCX file.

---

# Usecase

---

## Quickstart to create DOCX Node in Flowise

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd flowise-docx-node
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
    "filePath": "path/to/your/document.docx",
    "outputFormat": "plainText"
}
```

Output: The extracted content of the DOCX file.

---

## Project Structure

| File      | Description                                 |
| --------- | ------------------------------------------- |
| `Docx.ts` | Entry point, orchestrates DOCX file parsing |

### Detailed Explanation: `Docx.ts`

This module acts as the central orchestrator for parsing DOCX files.

-   Accepts Flowise-style input with file path and output format.
-   Parses the DOCX file and extracts content.
-   Outputs the extracted content in the specified format.

---

## Testing

We recommend using [Vitest](https://vitest.dev/) or Jest:

```ts
import { describe, it, expect } from 'vitest'

describe('Docx', () => {
    it('should parse DOCX content', () => {
        const docx = new Docx()
        const result = docx.parse('path/to/document.docx', 'plainText')
        expect(result).toBeInstanceOf(String)
    })
})
```

---

## Extendability

You can extend this node by:

-   Adding support for additional output formats.
-   Enabling advanced parsing options like extracting tables or images.
-   Supporting streaming for large DOCX files.

---
