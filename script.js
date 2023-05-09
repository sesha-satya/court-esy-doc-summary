document.getElementById('summary-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const urlInput = document.getElementById('url-input');
  const summaryContainer = document.getElementById('summary-container');
  const url = urlInput.value;

  try {
    // Replace this API call with the appropriate API to get the summary from a website.
    const response = await fetch(`https://api-to-summarize-url.com/summary?url=${url}`);
    const data = await response.json();
    const summary = data.summary;

    summaryContainer.innerHTML = `<h2>Summary:</h2><p>${summary}</p>`;
  } catch (error) {
    summaryContainer.innerHTML = `<p>Error: ${error.message}</p>`;
  }
});