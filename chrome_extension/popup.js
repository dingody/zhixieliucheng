document.addEventListener('DOMContentLoaded', () => {
  const stepsList = document.getElementById('steps');
  const startBtn = document.getElementById('start');
  const stopBtn = document.getElementById('stop');
  const exportJsonBtn = document.getElementById('export-json');
  const exportMdBtn = document.getElementById('export-md');
  const exportHtmlBtn = document.getElementById('export-html');

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


  function exportFile(data, type, filename) {
    const blob = new Blob([data], {type});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  exportJsonBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({type: 'getSteps'}, (response) => {
      const json = JSON.stringify(response.steps || [], null, 2);
      exportFile(json, 'application/json', 'steps.json');
    });
  });

  exportMdBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({type: 'getSteps'}, (response) => {
      const steps = response.steps || [];
      const md = steps.map((s, i) => `### Step ${i + 1}\n\n![step](${s.screenshot})\n\n${s.description}\n`).join('\n');
      exportFile(md, 'text/markdown', 'steps.md');
    });
  });

  exportHtmlBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({type: 'getSteps'}, (response) => {
      const steps = response.steps || [];
      const html = '<!DOCTYPE html><html><body>' +
        steps.map((s, i) => `<h3>Step ${i + 1}</h3><img src="${s.screenshot}" style="max-width:100%"><p>${s.description}</p>`).join('') +
        '</body></html>';
      exportFile(html, 'text/html', 'steps.html');
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
