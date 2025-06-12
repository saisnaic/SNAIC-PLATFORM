# Flowise EPUB Node

This custom Flowise node enables loading and processing of EPUB files, allowing you to extract structured data from eBooks for use in Flowise pipelines.

---

![EPUB Loader](epub.svg)

# How to use EPUB Node

-   **File Path**: Provide the path to the EPUB file.
-   **Output Format**: Specify the desired output format (e.g., plain text, JSON).
-   **Output**: The output will be the extracted content of the EPUB file.

---

# Usecase

---

## Quickstart to create EPUB Node in Flowise

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd flowise-epub-node
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
    "filePath": "path/to/your/book.epub",
    "outputFormat": "plainText"
}
```

Output: The extracted content of the EPUB file.

---

## Project Structure

| File      | Description                                 |
| --------- | ------------------------------------------- |
| `Epub.ts` | Entry point, orchestrates EPUB file parsing |

### Detailed Explanation: `Epub.ts`

This module acts as the central orchestrator for parsing EPUB files.

-   Accepts Flowise-style input with file path and output format.
-   Parses the EPUB file and extracts content.
-   Outputs the extracted content in the specified format.

---

## Testing

We recommend using [Vitest](https://vitest.dev/) or Jest:

```ts
import { describe, it, expect } from 'vitest'

describe('Epub', () => {
    it('should parse EPUB content', () => {
        const epub = new Epub()
        const result = epub.parse('path/to/book.epub', 'plainText')
        expect(result).toBeInstanceOf(String)
    })
})
```

---

## Extendability

You can extend this node by:

-   Adding support for additional output formats.
-   Enabling advanced parsing options like extracting metadata or images.
-   Supporting streaming for large EPUB files.

---
