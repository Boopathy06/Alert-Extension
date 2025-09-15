document.getElementById('saveBtn').addEventListener('click', () => {
    const enabled = document.getElementById('enableSwitch').checked;
    const sensitivity = parseFloat(document.getElementById('sensitivity').value);

    chrome.storage.sync.set({ enabled, sensitivity }, () => {
        alert('Settings saved!');
    });
});

chrome.storage.sync.get(['enabled', 'sensitivity'], (data) => {
    document.getElementById('enableSwitch').checked = data.enabled ?? true;
    document.getElementById('sensitivity').value = data.sensitivity ?? 0.5;
});
