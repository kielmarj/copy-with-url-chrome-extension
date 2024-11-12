// Create the context menu when the extension is installed or updated.
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "copyWithURL",
        title: "Copy with URL",
        contexts: ["selection"]
    });
});

// Listen for clicks on the context menu.
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "copyWithURL" && tab.id) {
        chrome.scripting.executeScript({
            target: {
                tabId: tab.id
            },
            function: copyWithURL
        }, () => {
            if (chrome.runtime.lastError) {
                console.error(`Script injection failed: ${chrome.runtime.lastError.message}`);
            }
        });
    }
});

// Listen for the Alt+C key command.
chrome.commands.onCommand.addListener((command) => {
    if (command === "copy_with_url") {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, (tabs) => {
            if (tabs.length > 0 && tabs[0].id) {
                chrome.scripting.executeScript({
                    target: {
                        tabId: tabs[0].id
                    },
                    function: copyWithURL
                }, () => {
                    if (chrome.runtime.lastError) {
                        console.error(`Script injection failed: ${chrome.runtime.lastError.message}`);
                    }
                });
            }
        });
    }
});

// Function that copies selected text with the URL.
function copyWithURL() {
    chrome.storage.sync.get(['prefix', 'format'], ({
        prefix = '',
        format = 'text'
    }) => {
        const selectedText = window.getSelection().toString().trim();

        if (!selectedText) {
            alert('Please select some text before copying.');
            return;
        }

        const pageUrl = window.location.href;
        const pageTitle = document.title;

        // Prepare the content for each format.
        const text = `${prefix}${pageTitle}\n${pageUrl}\n\n${selectedText}`;
        const html = `<p><a href="${pageUrl}">${pageTitle}</a><br><br>${selectedText}</p>`;
        const markdown = `[${pageTitle}](${pageUrl})\n\n${selectedText}`;

        // Copy based on the user's selected format.
        let contentToCopy;
        if (format === 'html') {
            contentToCopy = html;
        } else if (format === 'markdown') {
            contentToCopy = markdown;
        } else {
            contentToCopy = text;
        }

        navigator.clipboard.writeText(contentToCopy).then(() => {
            console.log(`URL copied with selection in ${format} format!`);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    });
}