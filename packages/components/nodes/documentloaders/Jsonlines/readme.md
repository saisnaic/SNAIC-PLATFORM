# Flowise JSONLines Node

This custom Flowise node enables loading and processing of JSONLines files, allowing you to extract structured data for use in Flowise pipelines.

---

![JSONLines Loader](jsonlines.svg)

# How to use JSONLines Node

-   **File Path**: Provide the path to the JSONLines file.
-   **Output**: The output will be the parsed content of the JSONLines file as an array of JSON objects.

---

# Usecase

---

## Quickstart to create JSONLines Node in Flowise

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd flowise-jsonlines-node
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
    "filePath": "path/to/your/file.jsonl"
}
```

Output: The parsed content of the JSONLines file as an array of JSON objects.

---

## Project Structure

| File           | Description                                      |
| -------------- | ------------------------------------------------ |
| `Jsonlines.ts` | Entry point, orchestrates JSONLines file parsing |

### Detailed Explanation: `Jsonlines.ts`

This module acts as the central orchestrator for parsing JSONLines files.

-   Accepts Flowise-style input with file path.
-   Parses the JSONLines file and extracts content.
-   Outputs the parsed content as an array of JSON objects.

---

## Testing

We recommend using [Vitest](https://vitest.dev/) or Jest:

```ts
import { describe, it, expect } from 'vitest'

describe('Jsonlines', () => {
    it('should parse JSONLines content', () => {
        const jsonlines = new Jsonlines()
        const result = jsonlines.parse('path/to/file.jsonl')
        expect(result).toBeInstanceOf(Array)
    })
})
```

---

## Extendability

You can extend this node by:

-   Adding support for additional JSONLines parsing options.
-   Enabling advanced filtering or transformation of JSONLines data.
-   Supporting streaming for large JSONLines files.

---
