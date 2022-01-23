// const wol = require('wake_on_lan');
const wol = { wake: mac => console.log(mac) };
const pcoff = require('./pcOff')
const TelegramBot = require('node-telegram-bot-api');

const token = '';
const config = {
  commandNotExitst: 'не понимаю команду...',
}

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
    let remote = tgUsersCommandsTree
    for (const word of words) {
      remote = remote[word]
      if (remote) {
        if (typeof remote === 'function') result = remote(word)
      } else return config.commandNotExitst
    }

    return result
  }

  /** executing */

  const text = msg.text

  const res = executeTextCommand(text)

  console.log(res)

})
