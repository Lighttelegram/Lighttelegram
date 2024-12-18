import os
from dotenv import load_dotenv
import telebot
from telebot.types import InlineKeyboardMarkup, InlineKeyboardButton

# Load environment variables
load_dotenv()
API_KEY = os.getenv('API_KEY')

if not API_KEY:
    raise ValueError("API_KEY not found. Ensure it is set in your environment variables.")

bot = telebot.TeleBot(API_KEY)

# /start command handler
@bot.message_handler(commands=['start'])
def start_command(message):
    # Get the user's first name dynamically
    user_name = message.from_user.first_name

    # Welcome text with emojis and user's name
    welcome_text = (
        f"Hello, {user_name}! 💡\n\n"
        "Welcome to the Light coin! 💡\n\n"
        "Be the Light in the Crypto World!💡"
        "Invite friends, Cliam your Light coin 💡"
    )
    # Inline keyboard with buttons
    markup = InlineKeyboardMarkup()
    markup.add(
        InlineKeyboardButton("✨ Subscribe to the channel ✨", url="https://t.me/TLC_Light"),  # Replace with your channel
        InlineKeyboardButton("💡 PLAY 💡", url="https://t.me/makeyourworldbright_bot/Light_bot?startapp=")  # Replace with your bot's startapp URL
    )

    # Send the message with inline buttons
    bot.send_message(message.chat.id, welcome_text, reply_markup=markup)

# Keep the bot polling
bot.polling()
