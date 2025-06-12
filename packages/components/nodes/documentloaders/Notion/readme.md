# Flowise Notion Node

This custom Flowise node enables integration with Notion, allowing you to fetch and process data from Notion databases, folders, and pages for use in Flowise pipelines.

---

![Notion Loader](notion-db.svg)

# How to use Notion Node

-   **API Key**: Provide your Notion API key for authentication.
-   **Resource Type**: Specify the type of resource to fetch (e.g., database, folder, page).
-   **Resource ID**: Provide the ID of the Notion resource.
-   **Output**: The output will be the content of the specified Notion resource, formatted as JSON.

---

# Usecase

---

## Quickstart to create Notion Node in Flowise

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd flowise-notion-node
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
    "resourceType": "database",
    "resourceId": "your-resource-id"
}
```

Output: The JSON content of the specified Notion resource.

---

## Project Structure

| File              | Description                         |
| ----------------- | ----------------------------------- |
| `NotionDB.ts`     | Handles Notion database integration |
| `NotionFolder.ts` | Handles Notion folder integration   |
| `NotionPage.ts`   | Handles Notion page integration     |

### Detailed Explanation: `NotionDB.ts`

This module acts as the central orchestrator for fetching data from Notion databases.

-   Accepts Flowise-style input with API key and database ID.
-   Fetches the specified database content.
-   Outputs the database content as JSON.

---

## Testing

We recommend using [Vitest](https://vitest.dev/) or Jest:

```ts
import { describe, it, expect } from 'vitest'

describe('NotionDB', () => {
    it('should fetch database content from Notion', async () => {
        const notionDB = new NotionDB('your-api-key')
        const dbContent = await notionDB.fetchDatabase('your-database-id')
        expect(dbContent).toBeInstanceOf(Object)
    })
})
```

---

## Extendability

You can extend this node by:

-   Adding support for additional Notion resource types.
-   Enabling advanced filtering or formatting of Notion data.
-   Supporting multiple resource fetches in parallel.

---
