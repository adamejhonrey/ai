// Query the bot for an answer
async function queryBot(message) {
  // Add a loading indicator to the message history
  addLoadingIndicator();
  // Make a request to the bot API
  const response = await fetch('/api/bot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message })
  });
  // Remove the loading indicator from the message history
  removeLoadingIndicator();
  // Return the response from the bot
  return await response.json();
}

function addLoadingIndicator() {
  // Clone the template loading element
  const loadingEl = document.querySelector('#template-loading').cloneNode(true);
  // Remove the "id" attribute from the loading element
  loadingEl.removeAttribute('id');
  // Add the loading element to the message history
  document.querySelector('#message-history').appendChild(loadingEl);
}

// Remove the loading indicator from the message history
function removeLoadingIndicator() {
  // Get the last message in the message history
  const lastMessageEl = document.querySelector('#message-history .message:last-child');
  // Check if the last message is a loading indicator
  if (lastMessageEl.classList.contains('loading')) {
    // Remove the loading indicator from the message history
    lastMessageEl.remove();
  }
}
