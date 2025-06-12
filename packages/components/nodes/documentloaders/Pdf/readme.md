# Flowise PDF Node

This custom Flowise node enables loading and processing of PDF files, allowing you to extract structured data for use in Flowise pipelines.

---

![PDF Loader](pdf.svg)

# How to use PDF Node

-   **File Path**: Provide the path to the PDF file.
-   **Output Format**: Specify the desired output format (e.g., plain text, JSON).
-   **Output**: The output will be the extracted content of the PDF file.

---

# Usecase

---

## Quickstart to create PDF Node in Flowise

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd flowise-pdf-node
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
    "filePath": "path/to/your/document.pdf",
    "outputFormat": "plainText"
}
```

Output: The extracted content of the PDF file.

---

## Project Structure

| File     | Description                                |
| -------- | ------------------------------------------ |
| `Pdf.ts` | Entry point, orchestrates PDF file parsing |

### Detailed Explanation: `Pdf.ts`

This module acts as the central orchestrator for parsing PDF files.

-   Accepts Flowise-style input with file path and output format.
-   Parses the PDF file and extracts content.
-   Outputs the extracted content in the specified format.

---

## Testing

We recommend using [Vitest](https://vitest.dev/) or Jest:

```ts
import { describe, it, expect } from 'vitest'

describe('Pdf', () => {
    it('should parse PDF content', () => {
        const pdf = new Pdf()
        const result = pdf.parse('path/to/document.pdf', 'plainText')
        expect(result).toBeInstanceOf(String)
    })
})
```

---

## Extendability

You can extend this node by:

-   Adding support for additional output formats.
-   Enabling advanced parsing options like extracting tables or images.
-   Supporting streaming for large PDF files.

---
