# Flowise Puppeteer Node

This custom Flowise node enables web scraping and automation using Puppeteer, allowing you to fetch structured data from websites for use in Flowise pipelines.

---

![Puppeteer Loader](puppeteer.svg)

# How to use Puppeteer Node

-   **Start URL**: Provide the starting URL for the scraping.
-   **Selectors**: Specify the CSS selectors to extract data.
-   **Output**: The output will be the extracted data, formatted as JSON.

---

# Usecase

---

## Quickstart to create Puppeteer Node in Flowise

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd flowise-puppeteer-node
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
    "selectors": [".title", ".description"]
}
```

Output: The JSON data extracted from the website.

---

## Project Structure

| File           | Description                            |
| -------------- | -------------------------------------- |
| `Puppeteer.ts` | Entry point, orchestrates web scraping |

### Detailed Explanation: `Puppeteer.ts`

This module acts as the central orchestrator for web scraping using Puppeteer.

-   Accepts Flowise-style input with start URL and selectors.
-   Scrapes the web starting from the specified URL.
-   Outputs the extracted data as JSON.

---

## Testing

We recommend using [Vitest](https://vitest.dev/) or Jest:

```ts
import { describe, it, expect } from 'vitest'

describe('Puppeteer', () => {
    it('should scrape and extract data', async () => {
        const puppeteer = new Puppeteer()
        const result = await puppeteer.scrape('https://example.com', ['.title'])
        expect(result).toBeInstanceOf(Object)
    })
})
```

---

## Extendability

You can extend this node by:

-   Adding support for advanced scraping options like handling authentication.
-   Enabling filtering of scraped data.
-   Supporting multiple start URLs.

---
