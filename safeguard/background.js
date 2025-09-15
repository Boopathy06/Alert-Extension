// background.js
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ enabled: true, sensitivity: 0.5 });
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg && msg.type === 'getSettings') {
    chrome.storage.sync.get(['enabled', 'sensitivity'], data => sendResponse(data));
    return true; // keep channel open
  }
});
