# Flowise CSV Node

This custom Flowise node enables dynamic loading and processing of CSV files. It is ideal for extracting structured data from CSV files for use in Flowise pipelines.

---

![CSV Loader](csv.svg)

# How to use CSV Node

-   **Upload File**: Provide the `.csv` file as the input.
-   **Delimiter**: Specify the delimiter used in the CSV file (e.g., `,`, `;`, `\t`). Defaults to `,` if not specified.
-   **Header Row**: Indicate whether the CSV file contains a header row. If not, columns will be indexed numerically.
-   **Output**: The output will be a JSON array where each object represents a row in the CSV file.

---

# Usecase

---

## Quickstart to create CSV Node in Flowise

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd flowise-csv-node
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
    "filePath": "path/to/your/file.csv",
    "delimiter": ",",
    "hasHeader": true
}
```

Output: A JSON array of rows extracted from the CSV file.

---

## Project Structure

| File           | Description                                 |
| -------------- | ------------------------------------------- |
| `Csv.ts`       | Entry point, orchestrates CSV loading       |
| `CsvLoader.ts` | Handles parsing and processing of CSV files |

### Detailed Explanation: `Csv.ts`

This module acts as the central orchestrator for loading and processing CSV files.

-   Accepts Flowise-style input with file path, delimiter, and header options.
-   Calls `CsvLoader` to parse the file and extract data.
-   Outputs the parsed data as a JSON array.

### Detailed Explanation: `CsvLoader.ts`

Handles the core logic of parsing CSV files.

-   Reads the file from the provided path.
-   Splits the content into rows and columns based on the specified delimiter.
-   Maps rows to JSON objects if a header row is present, otherwise uses numeric indices for keys.

---

## Testing

We recommend using [Vitest](https://vitest.dev/) or Jest:

```ts
import { describe, it, expect } from 'vitest'

describe('CsvLoader', () => {
    it('should parse CSV content into JSON', () => {
        const csvContent = 'Name,Age\nAlice,30\nBob,25'
        const loader = new CsvLoader()
        const result = loader.parse(csvContent, { hasHeader: true })
        expect(result).toEqual([
            { Name: 'Alice', Age: '30' },
            { Name: 'Bob', Age: '25' }
        ])
    })
})
```

---

## Extendability

You can extend this node by:

-   Adding support for additional delimiters or escape characters.
-   Enabling streaming for large CSV files.
-   Supporting advanced parsing options like quoted fields or multiline rows.

---
