let recording = false;

function broadcast(message) {
  chrome.tabs.query({}, (tabs) => {
    for (const tab of tabs) {
      chrome.tabs.sendMessage(tab.id, message);
    }
  });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({steps: [], recording: false});
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'startRecording') {
    recording = true;
    chrome.storage.local.set({steps: [], recording: true}, () => {
      sendResponse({started: true});
    });
    broadcast({type: 'startRecording'});
    return true;
  }

  if (msg.type === 'stopRecording') {
    recording = false;
    chrome.storage.local.set({recording: false}, () => {
      sendResponse({stopped: true});
    });
    broadcast({type: 'stopRecording'});
    return true;
  }

  if (msg.type === 'userEvent' && recording) {
    chrome.tabs.captureVisibleTab(sender.tab.windowId, {format: 'png'}, (dataUrl) => {
      const step = Object.assign({}, msg.event, {screenshot: dataUrl});
      chrome.storage.local.get({steps: []}, (data) => {
        data.steps.push(step);
        chrome.storage.local.set({steps: data.steps}, () => {
          chrome.runtime.sendMessage({type: 'newStep', step});
        });
      });
    });
    sendResponse({received: true});
    return true;
  }

  if (msg.type === 'getSteps') {
    chrome.storage.local.get({steps: []}, (data) => sendResponse({steps: data.steps}));
    return true;
  }

  if (msg.type === 'clearSteps') {
    chrome.storage.local.set({steps: []}, () => sendResponse({cleared: true}));
    return true;
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (recording && changeInfo.status === 'complete') {
    chrome.tabs.sendMessage(tabId, {type: 'startRecording'});
  }
});
