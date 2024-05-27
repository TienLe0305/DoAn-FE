let contentScriptLoaded = false;
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.isLogin == false) {
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
            contentScriptLoaded = true;
        }
      );
    });
  }

  if (msg.settingUpdate == true) {
    chrome.storage.local.get(["contentScriptReady"], function (result) {
      if(result.contentScriptReady) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          if (tabs.length === 0) return;
          const currentTabId = tabs[0].id;
          chrome.tabs.sendMessage(currentTabId, { settingUpdate: true });
        });
      }
    })
  }

  if (msg.loading === "load") {
    chrome.storage.local.set({ load: false });
  }
  setTimeout(function () {
    sendResponse({ status: true });
  }, 1);
  return true;
});