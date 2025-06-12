# Unstructured File/Folder Loader

The Unstructured File/Folder Loader node allows you to process and extract data from unstructured files or folders. This node integrates with the Unstructured API to handle various file formats and provides structured outputs for further processing in Flowise pipelines.

---

## 🌱 Environment Variables

| Variable             | Description                               | Type   | Default                                  |
| -------------------- | ----------------------------------------- | ------ | ---------------------------------------- |
| UNSTRUCTURED_API_URL | Default `apiUrl` for the Unstructured API | String | http://localhost:8000/general/v0/general |

---

## How to Use the Unstructured File/Folder Loader Node

1. **Set Up the Environment**:

    - Ensure the Unstructured API is running and accessible at the specified `UNSTRUCTURED_API_URL`.

2. **Configure the Node**:

    - **Input Path**: Provide the path to the file or folder you want to process.
    - **Output Format**: Specify the desired output format (e.g., JSON, plain text).

3. **Run the Node**:
    - The node will process the input files and return structured data based on the specified output format.

---

## Supported File Formats

The Unstructured File/Folder Loader supports a wide range of file formats, including but not limited to:

-   PDF
-   DOCX
-   TXT
-   HTML
-   Images (e.g., PNG, JPEG)

---

## Example Usage

### Input

-   **File Path**: `/path/to/unstructured/file.pdf`
-   **Output Format**: `JSON`

### Output

```json
{
    "content": "Extracted text from the file",
    "metadata": {
        "file_name": "file.pdf",
        "file_size": "12345 bytes"
    }
}
```

---

## License

Source code in this repository is made available under the [Apache License Version 2.0](https://github.com/FlowiseAI/Flowise/blob/master/LICENSE.md).
