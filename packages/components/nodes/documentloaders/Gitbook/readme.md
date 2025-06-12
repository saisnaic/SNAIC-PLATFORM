# Flowise Gitbook Node

This custom Flowise node enables integration with Gitbook, allowing you to fetch and process content from Gitbook pages for use in Flowise pipelines.

---

![Gitbook Loader](gitbook.svg)

# How to use Gitbook Node

-   **API Key**: Provide your Gitbook API key for authentication.
-   **Page ID**: Specify the ID of the Gitbook page to fetch.
-   **Output**: The output will be the content of the page, formatted as JSON.

---

# Usecase

---

## Quickstart to create Gitbook Node in Flowise

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd flowise-gitbook-node
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
    "pageId": "your-page-id"
}
```

Output: The JSON content of the Gitbook page.

---

## Project Structure

| File         | Description                                    |
| ------------ | ---------------------------------------------- |
| `Gitbook.ts` | Entry point, orchestrates Gitbook API requests |

### Detailed Explanation: `Gitbook.ts`

This module acts as the central orchestrator for fetching data from Gitbook.

-   Accepts Flowise-style input with API key and page ID.
-   Fetches the specified Gitbook page.
-   Outputs the page content as JSON.

---

## Testing

We recommend using [Vitest](https://vitest.dev/) or Jest:

```ts
import { describe, it, expect } from 'vitest'

describe('Gitbook', () => {
    it('should fetch page content from Gitbook', async () => {
        const gitbook = new Gitbook('your-api-key')
        const pageContent = await gitbook.fetchPage('your-page-id')
        expect(pageContent).toBeInstanceOf(Object)
    })
})
```

---

## Extendability

You can extend this node by:

-   Adding support for additional Gitbook API endpoints.
-   Enabling advanced filtering or formatting of page content.
-   Supporting multiple page fetches in parallel.

---
