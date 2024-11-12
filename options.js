document.addEventListener('DOMContentLoaded', () => {
    const prefixInput = document.getElementById('prefix');
    const formatSelect = document.getElementById('format');
    const saveButton = document.getElementById('save');

    // Load the saved prefix and format.
    chrome.storage.sync.get(['prefix', 'format'], (data) => {
        if (data.prefix) {
            prefixInput.value = data.prefix;
        }
        if (data.format) {
            formatSelect.value = data.format;
        }
    });

    // Save the prefix and format when the user clicks "Save".
    saveButton.addEventListener('click', () => {
        const prefix = prefixInput.value || '';
        const format = formatSelect.value || 'text';
        chrome.storage.sync.set({
            prefix,
            format
        }, () => {
            alert('Settings saved!');
        });
    });
});