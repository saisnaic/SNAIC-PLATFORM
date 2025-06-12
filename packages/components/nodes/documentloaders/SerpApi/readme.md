# Flowise SerpAPI Node

This custom Flowise node enables integration with SerpAPI, allowing you to fetch and process search results for use in Flowise pipelines.

---

![SerpAPI Loader](serp.svg)

# How to use SerpAPI Node

-   **API Key**: Provide your SerpAPI key for authentication.
-   **Query**: Specify the search query string.
-   **Output**: The output will be the search results, formatted as JSON.

---

# Usecase

---

## Quickstart to create SerpAPI Node in Flowise

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd flowise-serpapi-node
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

Output: The JSON search results from SerpAPI.

---

## Project Structure

| File         | Description                                |
| ------------ | ------------------------------------------ |
| `SerpAPI.ts` | Entry point, orchestrates SerpAPI requests |

### Detailed Explanation: `SerpAPI.ts`

This module acts as the central orchestrator for making SerpAPI requests.

-   Accepts Flowise-style input with API key and query.
-   Makes the API request using the specified parameters.
-   Outputs the API response as JSON.

---

## Testing

We recommend using [Vitest](https://vitest.dev/) or Jest:

```ts
import { describe, it, expect } from 'vitest'

describe('SerpAPI', () => {
    it('should fetch search results from SerpAPI', async () => {
        const serpAPI = new SerpAPI('your-api-key')
        const results = await serpAPI.search('Flowise documentation')
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
