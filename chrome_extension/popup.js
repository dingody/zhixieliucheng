document.addEventListener('DOMContentLoaded', () => {
  const stepsList = document.getElementById('steps');

  document.getElementById('capture').addEventListener('click', () => {
    chrome.runtime.sendMessage({type: 'capture'}, (response) => {
      const li = document.createElement('li');
      const img = document.createElement('img');
      img.src = response.dataUrl;
      li.appendChild(img);
      stepsList.appendChild(li);

      chrome.storage.local.get({steps: []}, (data) => {
        data.steps.push(response.dataUrl);
        chrome.storage.local.set({steps: data.steps});
      });
    });
  });

  chrome.storage.local.get({steps: []}, (data) => {
    for (const url of data.steps) {
      const li = document.createElement('li');
      const img = document.createElement('img');
      img.src = url;
      li.appendChild(img);
      stepsList.appendChild(li);
    }
  });
});
