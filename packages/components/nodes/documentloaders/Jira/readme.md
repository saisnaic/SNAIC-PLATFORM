# Flowise Jira Node

This custom Flowise node enables integration with Jira, allowing you to fetch and process data from Jira projects for use in Flowise pipelines.

---

![Jira Loader](jira.svg)

# How to use Jira Node

-   **Base URL**: Provide the base URL of your Jira instance.
-   **API Token**: Provide your Jira API token for authentication.
-   **Project Key**: Specify the key of the Jira project to fetch data from.
-   **Output**: The output will be the project data, formatted as JSON.

---

# Usecase

---

## Quickstart to create Jira Node in Flowise

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd flowise-jira-node
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
    "baseUrl": "https://your-jira-instance.atlassian.net",
    "apiToken": "your-api-token",
    "projectKey": "PROJECT"
}
```

Output: The JSON data of the specified Jira project.

---

## Project Structure

| File      | Description                                 |
| --------- | ------------------------------------------- |
| `Jira.ts` | Entry point, orchestrates Jira API requests |

### Detailed Explanation: `Jira.ts`

This module acts as the central orchestrator for fetching data from Jira.

-   Accepts Flowise-style input with base URL, API token, and project key.
-   Fetches the specified project data.
-   Outputs the project data as JSON.

---

## Testing

We recommend using [Vitest](https://vitest.dev/) or Jest:

```ts
import { describe, it, expect } from 'vitest'

describe('Jira', () => {
    it('should fetch project data from Jira', async () => {
        const jira = new Jira('https://your-jira-instance.atlassian.net', 'your-api-token')
        const projectData = await jira.fetchProject('PROJECT')
        expect(projectData).toBeInstanceOf(Object)
    })
})
```

---

## Extendability

You can extend this node by:

-   Adding support for additional Jira API endpoints.
-   Enabling advanced filtering or formatting of project data.
-   Supporting multiple project fetches in parallel.

---
