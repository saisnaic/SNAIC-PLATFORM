# Flowise Cheerio Node

This custom Flowise node enables web scraping using Cheerio, allowing you to extract structured data from HTML content for use in Flowise pipelines.

---

![Cheerio Loader](cheerio.svg)

# How to use Cheerio Node

-   **HTML Content**: Provide the HTML content as input.
-   **Selector**: Specify the CSS selector to extract data.
-   **Output**: The output will be the extracted data, parsed as JSON.

---

# Usecase

---

## Quickstart to create Cheerio Node in Flowise

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd flowise-cheerio-node
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
    "html": "<div><p>Hello, World!</p></div>",
    "selector": "p"
}
```

Output: The JSON data extracted from the HTML content.

---

## Project Structure

| File         | Description                            |
| ------------ | -------------------------------------- |
| `Cheerio.ts` | Entry point, orchestrates HTML parsing |

### Detailed Explanation: `Cheerio.ts`

This module acts as the central orchestrator for parsing HTML content.

-   Accepts Flowise-style input with HTML content and CSS selector.
-   Extracts data from the HTML using the specified selector.
-   Outputs the extracted data as JSON.

---

## Testing

We recommend using [Vitest](https://vitest.dev/) or Jest:

```ts
import { describe, it, expect } from 'vitest'

describe('Cheerio', () => {
    it('should extract data from HTML', () => {
        const cheerio = new Cheerio()
        const result = cheerio.extract('<div><p>Hello, World!</p></div>', 'p')
        expect(result).toEqual(['Hello, World!'])
    })
})
```

---

## Extendability

You can extend this node by:

-   Adding support for advanced selectors or XPath.
-   Enabling manipulation of HTML content.
-   Supporting multiple extractions in parallel.

---
