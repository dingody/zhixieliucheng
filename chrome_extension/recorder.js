let listeners = [];
let recording = false;

chrome.storage.local.get({recording: false}, (data) => {
  if (data.recording) {
    start();
  }
});

function describeElement(el) {
  if (!el) return '';
  if (el.innerText) return el.innerText.trim().slice(0, 30);
  if (el.placeholder) return el.placeholder;
  if (el.alt) return el.alt;
  return el.tagName.toLowerCase();
}

function handleClick(e) {
  const desc = `Clicked "${describeElement(e.target)}"`;
  sendEvent('click', desc);
}

function handleInput(e) {
  const desc = `Entered "${describeElement(e.target)}"`;
  sendEvent('input', desc);
}

function handleScroll(e) {
  const desc = 'Scrolled page';
  sendEvent('scroll', desc);
}

function sendEvent(eventType, description) {
  chrome.runtime.sendMessage({
    type: 'userEvent',
    event: {
      eventType,
      description,
      url: location.href,
      timestamp: Date.now(),
    }
  });
}

function start() {
  if (recording) return;
  recording = true;
  document.addEventListener('click', handleClick, true);
  document.addEventListener('change', handleInput, true);
  window.addEventListener('scroll', handleScroll, true);
  listeners = [
    ['click', handleClick],
    ['change', handleInput],
    ['scroll', handleScroll]
  ];
}

function stop() {
  if (!recording) return;
  recording = false;
  document.removeEventListener('click', handleClick, true);
  document.removeEventListener('change', handleInput, true);
  window.removeEventListener('scroll', handleScroll, true);
  listeners = [];
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'startRecording') {
    start();
  } else if (msg.type === 'stopRecording') {
    stop();
  }
});
