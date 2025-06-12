# Flowise Confluence Node

This custom Flowise node enables integration with Confluence, allowing you to fetch and process data from Confluence pages for use in Flowise pipelines.

---

![Confluence Loader](confluence.svg)

# How to use Confluence Node

-   **Base URL**: Provide the base URL of your Confluence instance.
-   **API Token**: Provide your Confluence API token for authentication.
-   **Page ID**: Specify the ID of the Confluence page to fetch.
-   **Output**: The output will be the page content, parsed as JSON.

---

# Usecase

---

## Quickstart to create Confluence Node in Flowise

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd flowise-confluence-node
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
    "baseUrl": "https://your-confluence-instance.atlassian.net",
    "apiToken": "your-api-token",
    "pageId": "123456"
}
```

Output: The JSON content of the specified Confluence page.

---

## Project Structure

| File            | Description                                        |
| --------------- | -------------------------------------------------- |
| `Confluence.ts` | Entry point, orchestrates Confluence data fetching |

### Detailed Explanation: `Confluence.ts`

This module acts as the central orchestrator for fetching data from Confluence.

-   Accepts Flowise-style input with base URL, API token, and page ID.
-   Fetches the specified Confluence page.
-   Outputs the page content as JSON.

---

## Testing

We recommend using [Vitest](https://vitest.dev/) or Jest:

```ts
import { describe, it, expect } from 'vitest'

describe('Confluence', () => {
    it('should fetch page content from Confluence', async () => {
        const confluence = new Confluence('https://your-confluence-instance.atlassian.net', 'your-api-token')
        const pageContent = await confluence.fetchPage('123456')
        expect(pageContent).toBeInstanceOf(Object)
    })
})
```

---

## Extendability

You can extend this node by:

-   Adding support for additional Confluence API endpoints.
-   Enabling advanced filtering or formatting of page content.
-   Supporting multiple page fetches in parallel.

---
