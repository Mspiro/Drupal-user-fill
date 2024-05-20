// background.js

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "fetch_data") {
    fetch('test.json')
      .then(response => response.json())
      .then(data => {
        sendResponse({ data: data });
      })
      .catch(error => {
        console.error('Error fetching JSON file:', error);
      });
    return true;
  }
});
