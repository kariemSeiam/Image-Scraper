chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'scrape') {
    const data = {
      title: document.title,
      images: Array.from(document.images).map((img) => img.src)
    };
    const dataUrl = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));
    sendResponse({ data: data });
    chrome.runtime.sendMessage({ type: 'data', dataUrl: dataUrl });
  }
});

