# Flowise Search API Node

This custom Flowise node enables integration with search APIs, allowing you to fetch and process search results for use in Flowise pipelines.

---

![Search API Loader](searchapi.svg)

# How to use Search API Node

-   **API Key**: Provide your search API key for authentication.
-   **Query**: Specify the search query string.
-   **Output**: The output will be the search results, formatted as JSON.

---

# Usecase

---

## Quickstart to create Search API Node in Flowise

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd flowise-search-api-node
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
    "query": "Flowise documentation"
}
```

Output: The JSON search results from the API.

---

## Project Structure

| File           | Description                                   |
| -------------- | --------------------------------------------- |
| `SearchAPI.ts` | Entry point, orchestrates search API requests |

### Detailed Explanation: `SearchAPI.ts`

This module acts as the central orchestrator for making search API requests.

-   Accepts Flowise-style input with API key and query.
-   Makes the API request using the specified parameters.
-   Outputs the API response as JSON.

---

## Testing

We recommend using [Vitest](https://vitest.dev/) or Jest:

```ts
import { describe, it, expect } from 'vitest'

describe('SearchAPI', () => {
    it('should fetch search results from API', async () => {
        const searchAPI = new SearchAPI('your-api-key')
        const results = await searchAPI.search('Flowise documentation')
        expect(results).toBeInstanceOf(Object)
    })
})
```

---

## Extendability

You can extend this node by:

-   Adding support for additional search options.
-   Enabling advanced filtering or sorting of results.
-   Supporting multiple queries in parallel.

---
