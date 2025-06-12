# Flowise File Node

This custom Flowise node enables loading and processing of generic files, allowing you to integrate various file types into Flowise pipelines.

---

![File Loader](file.svg)

# How to use File Node

-   **File Path**: Provide the path to the file.
-   **Output Format**: Specify the desired output format (e.g., plain text, JSON).
-   **Output**: The output will be the extracted content of the file.

---

# Usecase

---

## Quickstart to create File Node in Flowise

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd flowise-file-node
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
    "filePath": "path/to/your/file",
    "outputFormat": "plainText"
}
```

Output: The extracted content of the file.

---

## Project Structure

| File      | Description                            |
| --------- | -------------------------------------- |
| `File.ts` | Entry point, orchestrates file parsing |

### Detailed Explanation: `File.ts`

This module acts as the central orchestrator for parsing generic files.

-   Accepts Flowise-style input with file path and output format.
-   Parses the file and extracts content.
-   Outputs the extracted content in the specified format.

---

## Testing

We recommend using [Vitest](https://vitest.dev/) or Jest:

```ts
import { describe, it, expect } from 'vitest'

describe('File', () => {
    it('should parse file content', () => {
        const file = new File()
        const result = file.parse('path/to/file', 'plainText')
        expect(result).toBeInstanceOf(String)
    })
})
```

---

## Extendability

You can extend this node by:

-   Adding support for additional file types.
-   Enabling advanced parsing options like extracting metadata or images.
-   Supporting streaming for large files.

---
