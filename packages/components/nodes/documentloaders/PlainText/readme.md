# Flowise Plain Text Node

This custom Flowise node enables loading and processing of plain text files, allowing you to extract structured data for use in Flowise pipelines.

---

![Plain Text Loader](plaintext.svg)

# How to use Plain Text Node

-   **File Path**: Provide the path to the plain text file.
-   **Output**: The output will be the content of the plain text file.

---

# Usecase

---

## Quickstart to create Plain Text Node in Flowise

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd flowise-plaintext-node
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
    "filePath": "path/to/your/file.txt"
}
```

Output: The content of the plain text file.

---

## Project Structure

| File           | Description                                       |
| -------------- | ------------------------------------------------- |
| `PlainText.ts` | Entry point, orchestrates plain text file parsing |

### Detailed Explanation: `PlainText.ts`

This module acts as the central orchestrator for parsing plain text files.

-   Accepts Flowise-style input with file path.
-   Reads the plain text file and extracts content.
-   Outputs the content as plain text.

---

## Testing

We recommend using [Vitest](https://vitest.dev/) or Jest:

```ts
import { describe, it, expect } from 'vitest'

describe('PlainText', () => {
    it('should parse plain text content', () => {
        const plainText = new PlainText()
        const result = plainText.parse('path/to/file.txt')
        expect(result).toBeInstanceOf(String)
    })
})
```

---

## Extendability

You can extend this node by:

-   Adding support for additional text processing options.
-   Enabling advanced filtering or transformation of text data.
-   Supporting streaming for large text files.

---
