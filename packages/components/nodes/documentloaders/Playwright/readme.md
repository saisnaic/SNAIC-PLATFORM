# Flowise Playwright Node

This custom Flowise node enables web scraping and automation using Playwright, allowing you to fetch structured data from websites for use in Flowise pipelines.

---

![Playwright Loader](playwright.svg)

# How to use Playwright Node

-   **Start URL**: Provide the starting URL for the scraping.
-   **Selectors**: Specify the CSS selectors to extract data.
-   **Output**: The output will be the extracted data, formatted as JSON.

---

# Usecase

---

## Quickstart to create Playwright Node in Flowise

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd flowise-playwright-node
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

| File            | Description                            |
| --------------- | -------------------------------------- |
| `Playwright.ts` | Entry point, orchestrates web scraping |

### Detailed Explanation: `Playwright.ts`

This module acts as the central orchestrator for web scraping using Playwright.

-   Accepts Flowise-style input with start URL and selectors.
-   Scrapes the web starting from the specified URL.
-   Outputs the extracted data as JSON.

---

## Testing

We recommend using [Vitest](https://vitest.dev/) or Jest:

```ts
import { describe, it, expect } from 'vitest'

describe('Playwright', () => {
    it('should scrape and extract data', async () => {
        const playwright = new Playwright()
        const result = await playwright.scrape('https://example.com', ['.title'])
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
