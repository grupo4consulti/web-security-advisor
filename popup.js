chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.runtime.sendMessage({
    action: "validateSecurity",
    data: {
      url: tabs[0].url,
      sensitiveDataCollected: false // Esto será determinado en content.js
    }
  });
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  document.getElementById('message').textContent = message;
});
