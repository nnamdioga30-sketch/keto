document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('generateBtn');
  const videoInput = document.getElementById('videoUrl');
  const messageBox = document.getElementById('message');

  if (!generateBtn || !videoInput) return;

  generateBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const url = videoInput.value.trim();

    if (!url) {
      if (messageBox) messageBox.textContent = 'Please paste a valid video link!';
      return;
    }

    generateBtn.disabled = true;
    generateBtn.textContent = 'Loading...';
    if (messageBox) messageBox.textContent = 'Processing video...';

    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl: url })
      });

      const data = await response.json();

      if (!response.ok || !data.downloads) {
        throw new Error(data.error || 'Failed to process video link.');
      }

      if (messageBox) {
        messageBox.innerHTML = '';
        
        data.downloads.forEach(item => {
          const downloadBtn = document.createElement('a');
          downloadBtn.href = item.url;
          downloadBtn.target = '_blank';
          downloadBtn.rel = 'noopener noreferrer';
          downloadBtn.textContent = item.label;
          
          downloadBtn.style.display = 'block';
          downloadBtn.style.marginTop = '15px';
          downloadBtn.style.padding = '15px';
          downloadBtn.style.background = '#ff1744';
          downloadBtn.style.color = '#ffffff';
          downloadBtn.style.fontWeight = 'bold';
          downloadBtn.style.textDecoration = 'none';
          downloadBtn.style.borderRadius = '8px';
          
          messageBox.appendChild(downloadBtn);
        });
      }

    } catch (err) {
      if (messageBox) messageBox.textContent = 'Error: ' + err.message;
    } finally {
      generateBtn.disabled = false;
      generateBtn.textContent = 'Generate';
    }
  });
});
