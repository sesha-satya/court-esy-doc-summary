document.getElementById('summary-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const urlInput = document.getElementById('url-input');
  const summaryContainer = document.getElementById('summary-container');
  const addButton = document.getElementById('add-document');
  const url = urlInput.value;

  try {
    // Fetch the webpage content
    const response = await axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
    const htmlContent = response.data.contents;

    // Generate the summary using GPT-3 API
    const summary = await getSummaryFromGPT3(htmlContent);

    summaryContainer.innerHTML = `<h2>Summary:</h2><p>${summary}</p>`;
    addButton.style.display = 'inline-block';
    addButton.onclick = () => createAndDownloadSummaryDocument(summary);
  } catch (error) {
    summaryContainer.innerHTML = `<p>Error: ${error.message}</p>`;
  }
});

async function getSummaryFromGPT3(htmlContent) {
  // Replace 'your_api_key_here' with your actual OpenAI API key
  const apiKey = 'your_api_key_here';

  const prompt = `Please summarize the following webpage content:\n\n${htmlContent}\n\nSummary: `;
  const maxTokens = 100;

  const response = await axios.post(
    'https://api.openai.com/v1/engines/davinci-codex/completions',
    {
      prompt: prompt,
      max_tokens: maxTokens,
      n: 1,
      stop: null,
      temperature: 0.5,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    },
  );

  const summary = response.data.choices[0].text.trim();
  return summary;
}

function createAndDownloadSummaryDocument(summary) {
  const fileName = 'SummaryDocument.html';
  const content = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Summary Document</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #000;
          background-color: #E9DDDD;
        }
        h2 {
          font-size: 1.5rem;
          background-color: #F1F0FE;
          padding: 1rem;
        }
        p {
          padding: 1rem;
          background-color: #F1F0FE;
        }
      </style>
    </head>
    <body>
      <h2>Summary:</h2>
      <p>${summary}</p>
    </body>
    </html>
  `;

  const blob = new Blob([content], { type: 'text/html' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}