# LLM Chain Node

This custom Flowise node enables seamless integration with Language Learning Models (LLMs) to process inputs, apply moderation, and generate structured outputs. It is ideal for building conversational AI pipelines, generating predictions, or processing user queries dynamically.

---

![LLM Chain](images/llm-chain.png)

# How to use LLM Chain Node

-   **Language Model**: Select the LLM to use for processing inputs.
-   **Prompt**: Provide a prompt template to guide the LLM's response.
-   **Output Parser**: Optionally specify a parser to format the LLM's output.
-   **Input Moderation**: Add moderation rules to filter harmful or inappropriate inputs.
-   **Chain Name**: Optionally name your chain for better organization.

---

# Usecase

---

## Quickstart to create LLM Chain Node in Flowise

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd flowise-llm-chain-node
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
    "model": "gpt-4",
    "prompt": {
        "template": "What is the capital of {country}?",
        "inputVariables": ["country"]
    },
    "outputParser": {
        "type": "json"
    },
    "inputModeration": ["profanity", "violence"]
}
```

Output: A structured response from the LLM, optionally parsed into JSON or other formats.

---

## Project Structure

| File                     | Description                                              |
| ------------------------ | -------------------------------------------------------- |
| `LLMChain.ts`            | Entry point, orchestrates LLM integration and moderation |
| `Moderation.ts`          | Handles input moderation logic                           |
| `OutputParserHelpers.ts` | Utilities for parsing and formatting LLM outputs         |
| `multiModalUtils.ts`     | Adds support for vision-based LLMs                       |

### Detailed Explanation: `LLMChain.ts`

This module acts as the central orchestrator for integrating with LLMs.

-   Accepts Flowise-style input with model, prompt, and moderation settings
-   Supports dynamic output parsing and formatting
-   Handles input moderation to ensure safe and appropriate queries

### Detailed Explanation: `Moderation.ts`

Implements moderation logic to filter harmful or inappropriate inputs.

-   Contains:
    -   `checkInputs()` – Validates inputs against moderation rules
    -   `streamResponse()` – Streams moderated responses back to the user

### Detailed Explanation: `OutputParserHelpers.ts`

Provides utilities for parsing and formatting LLM outputs.

-   Contains:
    -   `formatResponse()` – Formats raw LLM output into structured data
    -   `injectOutputParser()` – Dynamically applies output parsers to LLM responses

### Detailed Explanation: `multiModalUtils.ts`

Adds support for vision-based LLMs (e.g., GPT-4 Vision).

-   Contains:
    -   `addImagesToMessages()` – Embeds images into LLM prompts
    -   `llmSupportsVision()` – Checks if the selected LLM supports vision-based inputs

---

## Testing

We recommend using [Vitest](https://vitest.dev/) or Jest:

```ts
import { describe, it, expect } from 'vitest'

describe('LLMChain', () => {
    it('should process input and return output', async () => {
        const chain = new LLMChain({ model: 'gpt-4', prompt: 'Hello, world!' })
        const result = await chain.run()
        expect(result).toBeDefined()
    })
})
```

---

## Extendability

You can extend this node by:

-   Adding support for additional LLMs or APIs
-   Enhancing moderation rules for specific use cases
-   Supporting advanced output formats or parsers
-   Enabling multi-modal inputs (e.g., text + images)

---
