chrome.runtime.sendMessage({
  action: "analyzeSecurity",
  url: window.location.href
}, (response) => {
  
} );
