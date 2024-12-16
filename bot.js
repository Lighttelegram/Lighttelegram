const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot('AAHFZ2v4ZnP72XNj0zPYI3zHR7bP2i9A6TU', { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Hello! Welcome to the bot.');
});
