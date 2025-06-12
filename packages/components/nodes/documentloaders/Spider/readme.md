# Flowise Spider Node

This custom Flowise node enables web crawling and data extraction using Spider, allowing you to fetch structured data from websites for use in Flowise pipelines.

---

![Spider Loader](spider.svg)

# How to use Spider Node

-   **Start URL**: Provide the starting URL for the crawl.
-   **Crawl Depth**: Specify the depth of the crawl.
-   **Output**: The output will be the extracted data, formatted as JSON.

---

# Usecase

---

## Quickstart to create Spider Node in Flowise

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd flowise-spider-node
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
    "startUrl": "https://example.com",
    "crawlDepth": 2
}
```

Output: The JSON data extracted from the crawl.

---

## Project Structure

| File           | Description                            |
| -------------- | -------------------------------------- |
| `Spider.ts`    | Entry point, orchestrates web crawling |
| `SpiderApp.ts` | Handles Spider application logic       |

### Detailed Explanation: `Spider.ts`

This module acts as the central orchestrator for web crawling.

-   Accepts Flowise-style input with start URL and crawl depth.
-   Crawls the web starting from the specified URL.
-   Outputs the extracted data as JSON.

---

## Testing

We recommend using [Vitest](https://vitest.dev/) or Jest:

```ts
import { describe, it, expect } from 'vitest'

describe('Spider', () => {
    it('should crawl and extract data', async () => {
        const spider = new Spider()
        const result = await spider.crawl('https://example.com', 2)
        expect(result).toBeInstanceOf(Object)
    })
})
```

---

## Extendability

You can extend this node by:

-   Adding support for advanced crawling options like rate limiting.
-   Enabling filtering of crawled data.
-   Supporting multiple start URLs.

---
