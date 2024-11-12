# Chrome extension: 

This extension allows you to automatically include the URL of a page when you copy text to the clipboard.

# How To

Use Alt+C or Right-click > 'Copy with URL' to copy selected text. The pasted content will look like this:

```
# Saved from: https://example.com

Pasted text here ...
```

# Customization

Visit the extensions 'Options' page to:
- Customize the text that appears before the URL.
- Specify a preferred format for the URL. Choose from:
  - Markdown:
    ```markdown
    **Saved from: ** [https://www.example.com](https://www.example.com)

    Pasted text here ...
    ```
  - HTML:
    ```html
    <p>Saved from:  <a href="https://www.example.com">https://www.example.com</a></p><br>Pasted text here ...
    ```
  - Plain text:
    ```txt
    Saved from: https://www.example.com

    Pasted text here ...
    ```

# Installation

1. Make sure all files are in a single folder
2. Go to `chrome://extensions/`
3. Enable Developer mode
4. Click `load unpacked` and upload the folder containing the extension files
