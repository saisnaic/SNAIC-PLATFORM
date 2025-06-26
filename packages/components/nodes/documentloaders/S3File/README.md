# Flowise S3 File Node

This custom Flowise node enables integration with Amazon S3, allowing you to fetch and process individual files from an S3 bucket for use in Flowise pipelines.

---

![S3 File Loader](s3.svg)

# How to use S3 File Node

-   **Bucket Name**: Provide the name of the S3 bucket.
-   **File Path**: Specify the path to the file within the bucket.
-   **Output**: The output will be the content of the file, formatted as JSON.

---

# Usecase

---

## Quickstart to create S3 File Node in Flowise

| Variable                     | Description                                                                                     | Type                                             | Default                             |
| ---------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------ | ----------------------------------- |
| UNSTRUCTURED_API_URL | Default `unstructuredApiUrl` for S3 File Loader                                            | String                                                                    |  http://localhost:8000/general/v0/general          |

```bash
git clone <your-repo-url>
cd flowise-s3-file-node
pnpm install
```

Source code in this repository is made available under the [Apache License Version 2.0](https://github.com/FlowiseAI/Flowise/blob/master/LICENSE.md).