document.getElementById('summary-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const urlInput = document.getElementById('url-input');
  const summaryContainer = document.getElementById('summary-container');
  const url = urlInput.value;

  try {
    // Fetch the webpage content
    const response = await axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
    const htmlContent = response.data.contents;

    // Generate the summary using GPT-3 API
    const summary = await getSummaryFromGPT3(htmlContent);

    summaryContainer.innerHTML = `<h2>Summary:</h2><p>${summary}</p>`;
  } catch (error) {
    summaryContainer.innerHTML = `<p>Error: ${error.message}</p>`;
  }
});

async function getSummaryFromGPT3(htmlContent) {
  // Replace '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' with your actual OpenAI API key
  const apiKey = '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';

  const prompt = `Please summarize the following webpage content:\n\n${htmlContent}\n\nSummary: `;
  const maxTokens = 100;

  const response = await axios.post(
    'https://api.openai.com/v1/engines/davinci-codex/completions',
    {
