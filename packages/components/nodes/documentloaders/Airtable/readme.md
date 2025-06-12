# Flowise Airtable Node

This custom Flowise node enables seamless integration with Airtable, allowing you to fetch and process data from Airtable bases for use in Flowise pipelines.

---

![Airtable Loader](airtable.svg)

# How to use Airtable Node

-   **API Key**: Provide your Airtable API key for authentication.
-   **Base ID**: Specify the ID of the Airtable base you want to access.
-   **Table Name**: Provide the name of the table within the base.
-   **Output**: The output will be a JSON array of records from the specified table.

---

# Usecase

---

## Quickstart to create Airtable Node in Flowise

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd flowise-airtable-node
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
    "apiKey": "your-api-key",
    "baseId": "appXXXXXXXXXXXXXX",
    "tableName": "Table 1"
}
```

Output: A JSON array of records fetched from Airtable.

---

## Project Structure

| File          | Description                                      |
| ------------- | ------------------------------------------------ |
| `Airtable.ts` | Entry point, orchestrates Airtable data fetching |

### Detailed Explanation: `Airtable.ts`

This module acts as the central orchestrator for fetching data from Airtable.

-   Accepts Flowise-style input with API key, base ID, and table name.
-   Fetches records from the specified Airtable table.
-   Outputs the fetched data as a JSON array.

---

## Testing

We recommend using [Vitest](https://vitest.dev/) or Jest:

```ts
import { describe, it, expect } from 'vitest'

describe('Airtable', () => {
    it('should fetch records from Airtable', async () => {
        const airtable = new Airtable('your-api-key')
        const records = await airtable.fetchRecords('appXXXXXXXXXXXXXX', 'Table 1')
        expect(records).toBeInstanceOf(Array)
    })
})
```

---

## Extendability

You can extend this node by:

-   Adding support for filtering or sorting records.
-   Enabling batch updates or inserts.
-   Supporting additional Airtable API features like linked records.

---
