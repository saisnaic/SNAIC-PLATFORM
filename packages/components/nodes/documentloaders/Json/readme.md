# Flowise JSON Node

This custom Flowise node enables loading and processing of JSON files, allowing you to extract structured data for use in Flowise pipelines.

---

![JSON Loader](json.svg)

# How to use JSON Node

-   **File Path**: Provide the path to the JSON file.
-   **Output**: The output will be the parsed content of the JSON file.

---

# Usecase

---

## Quickstart to create JSON Node in Flowise

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd flowise-json-node
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
    "filePath": "path/to/your/file.json"
}
```

Output: The parsed content of the JSON file.

---

## Project Structure

| File      | Description                                 |
| --------- | ------------------------------------------- |
| `Json.ts` | Entry point, orchestrates JSON file parsing |

### Detailed Explanation: `Json.ts`

This module acts as the central orchestrator for parsing JSON files.

-   Accepts Flowise-style input with file path.
-   Parses the JSON file and extracts content.
-   Outputs the parsed content as JSON.

---

## Testing

We recommend using [Vitest](https://vitest.dev/) or Jest:

```ts
import { describe, it, expect } from 'vitest'

describe('Json', () => {
    it('should parse JSON content', () => {
        const json = new Json()
        const result = json.parse('path/to/file.json')
        expect(result).toBeInstanceOf(Object)
    })
})
```

---

## Extendability

You can extend this node by:

-   Adding support for additional JSON parsing options.
-   Enabling advanced filtering or transformation of JSON data.
-   Supporting streaming for large JSON files.

---
