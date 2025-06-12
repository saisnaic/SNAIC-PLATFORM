# Flowise Github Node

This custom Flowise node enables integration with Github, allowing you to fetch and process data from Github repositories for use in Flowise pipelines.

---

![Github Loader](github.svg)

# How to use Github Node

-   **API Token**: Provide your Github API token for authentication.
-   **Repository**: Specify the repository to fetch data from (e.g., `owner/repo`).
-   **Output**: The output will be the repository data, formatted as JSON.

---

# Usecase

---

## Quickstart to create Github Node in Flowise

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd flowise-github-node
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
    "apiToken": "your-api-token",
    "repository": "owner/repo"
}
```

Output: The JSON data of the specified Github repository.

---

## Project Structure

| File        | Description                                   |
| ----------- | --------------------------------------------- |
| `Github.ts` | Entry point, orchestrates Github API requests |

### Detailed Explanation: `Github.ts`

This module acts as the central orchestrator for fetching data from Github.

-   Accepts Flowise-style input with API token and repository.
-   Fetches the specified repository data.
-   Outputs the repository data as JSON.

---

## Testing

We recommend using [Vitest](https://vitest.dev/) or Jest:

```ts
import { describe, it, expect } from 'vitest'

describe('Github', () => {
    it('should fetch repository data from Github', async () => {
        const github = new Github('your-api-token')
        const repoData = await github.fetchRepo('owner/repo')
        expect(repoData).toBeInstanceOf(Object)
    })
})
```

---

## Extendability

You can extend this node by:

-   Adding support for additional Github API endpoints.
-   Enabling advanced filtering or formatting of repository data.
-   Supporting multiple repository fetches in parallel.

---
