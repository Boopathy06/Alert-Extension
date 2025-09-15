console.log("SocialGuard: starting observer...");

function startObserver(sensitivity) {
    const chatObserver = new MutationObserver(() => {
        const messages = document.querySelectorAll('span.selectable-text');
        messages.forEach(msg => {
            if (!msg.dataset.scanned) {
                msg.dataset.scanned = "true";
                const text = msg.innerText.trim();
                const result = classifyText(text, { sensitivity });

                if (result.label === "warning") {
                    // Add red alert box under the message
                    let alertBox = document.createElement("div");
                    alertBox.style.background = "#ff4d4d";
                    alertBox.style.color = "white";
                    alertBox.style.padding = "5px";
                    alertBox.style.marginTop = "2px";
                    alertBox.style.borderRadius = "4px";
                    alertBox.style.fontSize = "12px";
                    alertBox.innerText = "⚠ Possible coercion detected: " + result.reasons.join(", ");
                    msg.parentElement.appendChild(alertBox);

                    // Browser popup alert
                    alert("⚠ SocialGuard detected possible coercion or blackmail:\n\n" + text);
                }
            }
        });
    });

    const chatContainer = document.querySelector("#main");
    if (chatContainer) {
        chatObserver.observe(chatContainer, { childList: true, subtree: true });
        console.log("SocialGuard: chat observer started.");
    } else {
        console.warn("Waiting for chat to load...");
        setTimeout(() => startObserver(sensitivity), 1000); // retry in 1s
    }
}

// Get settings and start
chrome.storage.sync.get(['enabled', 'sensitivity'], (data) => {
    const enabled = data.enabled ?? true;
    const sensitivity = data.sensitivity ?? 0.5;
    if (enabled) {
        startObserver(sensitivity);
    }
});
