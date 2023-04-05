chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      files: ['content.js']
    },
    () => {
      chrome.tabs.create({ url: 'popup.html', active: true });
    }
  );
});
