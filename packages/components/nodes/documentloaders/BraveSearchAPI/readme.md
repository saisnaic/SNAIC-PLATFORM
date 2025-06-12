# Flowise Brave Search API Node

This custom Flowise node enables integration with the Brave Search API, allowing you to fetch search results programmatically for use in Flowise pipelines.

---

![Brave Search API](brave.svg)

# How to use Brave Search API Node

-   **API Key**: Provide your Brave Search API key for authentication.
-   **Query**: Specify the search query string.
-   **Options**: Optionally provide additional search options (e.g., language, region).
-   **Output**: The output will be the search results, parsed as JSON.

---

# Usecase

---

## Quickstart to create Brave Search API Node in Flowise

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd flowise-brave-search-node
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
    "query": "Flowise documentation",
    "options": {
        "language": "en",
        "region": "US"
    }
}
```

Output: The JSON search results from the Brave Search API.

---

## Project Structure

| File                | Description                                         |
| ------------------- | --------------------------------------------------- |
| `BraveSearchAPI.ts` | Entry point, orchestrates Brave Search API requests |

### Detailed Explanation: `BraveSearchAPI.ts`

This module acts as the central orchestrator for making Brave Search API requests.

-   Accepts Flowise-style input with API key, query, and options.
-   Makes the API request using the specified parameters.
-   Outputs the API response as JSON.

---

## Testing

We recommend using [Vitest](https://vitest.dev/) or Jest:

```ts
import { describe, it, expect } from 'vitest'

describe('BraveSearchAPI', () => {
    it('should fetch search results from Brave API', async () => {
        const braveSearch = new BraveSearchAPI('your-api-key')
        const results = await braveSearch.search('Flowise documentation')
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
