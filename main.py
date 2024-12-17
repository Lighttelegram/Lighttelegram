from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import Updater, CommandHandler, CallbackQueryHandler, CallbackContext
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Get the token from the environment variable
TOKEN = os.getenv('8088416514:AAGWu_XFnRdHMLSlobC9mWPT_sOkNFB0tOA')

# /start command handler
def start(update: Update, context: CallbackContext) -> None:
    keyboard = [
        [InlineKeyboardButton("💡 PLAY 💡", callback_data='play')],
        [InlineKeyboardButton("💡 Subscribe to the channel 💡", url="https://t.me/TLC_Light")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    update.message.reply_text(
        "Hello! 💡\nWelcome! Create your own Light, invite friends, and have fun!",
        reply_markup=reply_markup
    )

# Button click handler
def button(update: Update, context: CallbackContext) -> None:
    query = update.callback_query
    query.answer()
    if query.data == 'play':
        query.edit_message_text(text="💡 You clicked PLAY! Let's start the game!")

# Main function
def main():
    # Use the token loaded from .env
    updater = Updater(TOKEN, use_context=True)
    dp = updater.dispatcher

    # Register handlers
    dp.add_handler(CommandHandler("start", start))
    dp.add_handler(CallbackQueryHandler(button))

    # Start the bot
    updater.start_polling()
    print("Bot is running...")
    updater.idle()

if __name__ == "__main__":
    main()
