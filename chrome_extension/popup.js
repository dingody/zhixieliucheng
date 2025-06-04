document.addEventListener('DOMContentLoaded', () => {
  const stepsList = document.getElementById('steps');
  const startBtn = document.getElementById('start');
  const stopBtn = document.getElementById('stop');
  const exportBtn = document.getElementById('export');

  function addStep(step) {
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src = step.screenshot;
    const desc = document.createElement('div');
    desc.textContent = step.description;
    li.appendChild(img);
    li.appendChild(desc);
    stepsList.appendChild(li);
  }

  startBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({type: 'startRecording'});
  });

  stopBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({type: 'stopRecording'});
  });

  exportBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({type: 'getSteps'}, (response) => {
      const data = response.steps || [];
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], {type: 'application/json'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'steps.json';
      a.click();
      URL.revokeObjectURL(url);
    });
  });

  chrome.runtime.sendMessage({type: 'getSteps'}, (response) => {
    (response.steps || []).forEach(addStep);
  });

  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === 'newStep') {
      addStep(msg.step);
    }
  });
});
