// index.js

require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3000;  // You can change this to any available port

// Get the Telegram Bot Token from the environment variable
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_API_URL = `https://t.me/makeyourworldbright_bot${TELEGRAM_BOT_TOKEN}`;

// Middleware to parse incoming JSON requests
app.use(express.json());

// This function will send a welcome message when the user sends /start
function sendWelcomeMessage(chatId) {
  const message = "Welcome to Light! Type any command to start.";

  fetch(`${https://t.me/makeyourworldbright_bot}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
    }),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Message sent:', data);
    })
    .catch(error => {
      console.error('Error sending message:', error);
    });
}

// Webhook to receive updates from Telegram (this will handle all commands)
app.post('/webhook', (req, res) => {
  const { message } = req.body;

  if (message) {
    const { text, from } = message;
    const chatId = from.id;

    // Handle the /start command
    if (text === '/start') {
      sendWelcomeMessage(chatId);  // Send the welcome message to the user
    }

    res.send('OK');
  } else {
    res.send('No message received');
  }
});

// Set the webhook for your bot to receive messages
const setWebhook = () => {
  const url = `${https://t.me/makeyourworldbright_bot}/setWebhook?url=${process.env.WEBHOOK_URL}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log('Webhook set:', data);
    })
    .catch(error => {
      console.error('Error setting webhook:', error);
    });
};

// Start the server and set the webhook when the server starts
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  setWebhook();  // Set the webhook for your bot
});
