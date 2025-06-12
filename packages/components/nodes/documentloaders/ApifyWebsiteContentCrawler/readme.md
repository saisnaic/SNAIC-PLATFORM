# Flowise Apify Website Content Crawler Node

This custom Flowise node enables web scraping using Apify, allowing you to extract structured data from websites for use in Flowise pipelines.

---

![Apify Website Content Crawler](apify-symbol-transparent.svg)

# How to use Apify Website Content Crawler Node

-   **Apify API Token**: Provide your Apify API token for authentication.
-   **Actor ID**: Specify the ID of the Apify actor to run.
-   **Input**: Provide the input configuration for the actor.
-   **Output**: The output will be the data extracted by the actor, parsed as JSON.

---

# Usecase

---

## Quickstart to create Apify Website Content Crawler Node in Flowise

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd flowise-apify-node
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
    "apiToken": "your-apify-api-token",
    "actorId": "your-actor-id",
    "input": {
        "startUrls": [{ "url": "https://example.com" }]
    }
}
```

Output: The JSON data extracted by the Apify actor.

---

## Project Structure

| File                            | Description                                     |
| ------------------------------- | ----------------------------------------------- |
| `ApifyWebsiteContentCrawler.ts` | Entry point, orchestrates Apify actor execution |

### Detailed Explanation: `ApifyWebsiteContentCrawler.ts`

This module acts as the central orchestrator for running Apify actors.

-   Accepts Flowise-style input with API token, actor ID, and input configuration.
-   Executes the specified Apify actor.
-   Outputs the actor's result as JSON.

---

## Testing

We recommend using [Vitest](https://vitest.dev/) or Jest:

```ts
import { describe, it, expect } from 'vitest'

describe('ApifyWebsiteContentCrawler', () => {
    it('should fetch data using Apify actor', async () => {
        const crawler = new ApifyWebsiteContentCrawler('your-api-token')
        const result = await crawler.runActor('your-actor-id', { startUrls: [{ url: 'https://example.com' }] })
        expect(result).toBeInstanceOf(Object)
    })
})
```

---

## Extendability

You can extend this node by:

-   Adding support for additional Apify actor options.
-   Enabling advanced input configurations.
-   Supporting multiple actor executions in parallel.

---
