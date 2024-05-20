document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("startProcess")
    .addEventListener("click", function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs
          .sendMessage(tabs[0].id, { action: "start_autofill" });
      });
    });
});
