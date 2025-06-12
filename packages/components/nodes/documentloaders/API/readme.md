# Flowise API Node

This custom Flowise node enables integration with external APIs, allowing you to fetch and process data from any RESTful API for use in Flowise pipelines.

---

![API Loader](api.svg)

# How to use API Node

-   **Endpoint URL**: Provide the URL of the API endpoint.
-   **HTTP Method**: Specify the HTTP method (e.g., GET, POST).
-   **Headers**: Optionally provide headers for the API request.
-   **Body**: Optionally provide a request body for POST/PUT requests.
-   **Output**: The output will be the API response, parsed as JSON.

---

# Usecase

---

## Quickstart to create API Node in Flowise

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd flowise-api-node
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
    "url": "https://api.example.com/data",
    "method": "GET",
    "headers": {
        "Authorization": "Bearer your-token"
    }
}
```

Output: The JSON response from the API.

---

## Project Structure

| File           | Description                            |
| -------------- | -------------------------------------- |
| `APILoader.ts` | Entry point, orchestrates API requests |

### Detailed Explanation: `APILoader.ts`

This module acts as the central orchestrator for making API requests.

-   Accepts Flowise-style input with URL, method, headers, and body.
-   Makes the API request using the specified parameters.
-   Outputs the API response as JSON.

---

## Testing

We recommend using [Vitest](https://vitest.dev/) or Jest:

```ts
import { describe, it, expect } from 'vitest'

describe('APILoader', () => {
    it('should fetch data from API', async () => {
        const apiLoader = new APILoader()
        const response = await apiLoader.fetch('https://api.example.com/data', 'GET')
        expect(response).toBeInstanceOf(Object)
    })
})
```

---

## Extendability

You can extend this node by:

-   Adding support for additional HTTP methods.
-   Enabling OAuth or other authentication mechanisms.
-   Supporting advanced request options like retries or timeouts.

---
