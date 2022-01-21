const wol = require('wake_on_lan');
const pcoff = require('./pcOff')
const TelegramBot = require('node-telegram-bot-api');

const token = '';

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, resp);
})

bot.on('message', (msg) => {
  const chatId = msg.chat.id

  const MACs = {
    1: '',
    2: '',
    5: '',
    7: '',
    8: '',
    9: '',
    11: '',
    15: '',
  }

  const tgUsersCommandsTree = {
    'бот': {
      'включи': {
        'комп': numb => {
          if (MACs[numb]) {
            bot.sendMessage(chatId, "Минутку, включаю...")
            wol.wake(MACs[numb])
          } else {
            bot.sendMessage(chatId, "ПК с таким номером нет")
          }
        },
      },
    }
  }


  function executeTextCommand(text) {
    const words = text.split(' ')
    let parent = tgUsersCommandsTree
    for (const word of words) {
      parent = parent[word]
      if (typeof parent === 'function') parent = parent(word)
    }

    return result = parent
  }

  /** executing */

  const text = msg.text

  const res = executeTextCommand(text)

  console.log(res)

})
