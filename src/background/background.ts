chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.isLogin == true) {
    chrome.tabs.reload();
  } else {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs.length === 0) return;
      const currentTabId = tabs[0].id;
      chrome.scripting.executeScript(
        {
          target: { tabId: currentTabId },
          files: ["contentScript.js"],
        },
        () => {
          chrome.tabs.sendMessage(currentTabId, { cleanup: true });
        }
      );
    });
  }

  if (msg.loading === "load") {
    chrome.storage.local.set({ load: false });
  }

  setTimeout(function () {
    sendResponse({ status: true });
  }, 1);
  return true;
});
