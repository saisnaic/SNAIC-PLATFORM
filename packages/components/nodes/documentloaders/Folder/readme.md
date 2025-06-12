# Flowise Folder Node

This custom Flowise node enables loading and processing of files from a folder, allowing you to integrate multiple files into Flowise pipelines.

---

![Folder Loader](folder.svg)

# How to use Folder Node

-   **Folder Path**: Provide the path to the folder.
-   **File Types**: Specify the types of files to include (e.g., `.txt`, `.csv`).
-   **Output**: The output will be the content of the files, formatted as JSON.

---

# Usecase

---

## Quickstart to create Folder Node in Flowise

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd flowise-folder-node
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
    "folderPath": "path/to/your/folder",
    "fileTypes": [".txt", ".csv"]
}
```

Output: The JSON content of the files in the folder.

---

## Project Structure

| File        | Description                                 |
| ----------- | ------------------------------------------- |
| `Folder.ts` | Entry point, orchestrates folder processing |

### Detailed Explanation: `Folder.ts`

This module acts as the central orchestrator for processing files in a folder.

-   Accepts Flowise-style input with folder path and file types.
-   Reads the files in the specified folder.
-   Outputs the content of the files as JSON.

---

## Testing

We recommend using [Vitest](https://vitest.dev/) or Jest:

```ts
import { describe, it, expect } from 'vitest'

describe('Folder', () => {
    it('should process files in a folder', () => {
        const folder = new Folder()
        const result = folder.process('path/to/folder', ['.txt'])
        expect(result).toBeInstanceOf(Array)
    })
})
```

---

## Extendability

You can extend this node by:

-   Adding support for additional file types.
-   Enabling advanced filtering options.
-   Supporting recursive folder processing.

---
