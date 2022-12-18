// Query the bot for an answer
async function queryBot(message) {
  // Make a request to the bot API
  const response = await fetch('/api/bot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message })
  });
  // Return the response from the bot
  return await response.json();
}

// Send a message to the bot
async function sendMessage() {
  // Get the message input element and value
  const inputEl = document.querySelector('#message-input');
  const message = inputEl.value;
  // Clear the input field
  inputEl.value = '';
  // Query the bot for an answer
  const answer = await queryBot(message);
  // Add the message to the message history
  addMessage(message, 'user');
  // Add the bot's answer to the message history
  addMessage(answer.text, 'bot');
}

// Add a message to the message history
function addMessage(text, sender) {
  // Clone the template message element
  const messageEl = document.querySelector('#template-message').cloneNode(true);
  // Set the message text
  messageEl.querySelector('.message-content').textContent = text;
  // Set the message sender
  messageEl.querySelector('.message-sender').textContent = sender;
  // Add the message element to the message history
  document.querySelector('#message-history').appendChild(messageEl);
}

// Handle form submission
document.querySelector('#message-form').addEventListener('submit', e => {
  e.preventDefault();
  sendMessage();
});
