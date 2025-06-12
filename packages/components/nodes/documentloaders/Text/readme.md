# Flowise Text Node

This custom Flowise node enables loading and processing of text files, allowing you to extract structured data for use in Flowise pipelines.

---

![Text Loader](Txt.svg)

# How to use Text Node

-   **File Path**: Provide the path to the text file.
-   **Output**: The output will be the content of the text file.

---

# Usecase

---

## Quickstart to create Text Node in Flowise

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd flowise-text-node
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

Output: The content of the text file.

---

## Project Structure

| File      | Description                                 |
| --------- | ------------------------------------------- |
| `Text.ts` | Entry point, orchestrates text file parsing |

### Detailed Explanation: `Text.ts`

This module acts as the central orchestrator for parsing text files.

-   Accepts Flowise-style input with file path.
-   Reads the text file and extracts content.
-   Outputs the content as plain text.

---

## Testing

We recommend using [Vitest](https://vitest.dev/) or Jest:

```ts
import { describe, it, expect } from 'vitest'

describe('Text', () => {
    it('should parse text content', () => {
        const text = new Text()
        const result = text.parse('path/to/file.txt')
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
