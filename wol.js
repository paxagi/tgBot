// const wol = require('wake_on_lan');
const wol = { wake: mac => console.log(mac) };
const pcoff = require('./pcOff')
const TelegramBot = require('node-telegram-bot-api');

const token = '';
const config = {
  msg: {
    commandNotExitst: 'не понимаю команду...',
  },
  bot: {
    nickname: 'бот',
  },
}

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, resp);
})

bot.on('message', (msg) => {
  const chatId = msg.chat.id
  const name = msg.from.first_name

  console.log(`${name}: ${msg.text}`);

  const sendReply = (msg) => {
    bot.sendMessage(chatId, `${name}, ${msg}`, { parse_mode: 'HTML' })
  }

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
            sendReply('минутку, включаю...')
            wol.wake(MACs[numb])
          } else {
            sendReply('ПК с таким номером нет')
          }
        },
      },
      'выключи': () => sendReply('пока нечего')
    }
  }


  function executeTextCommand(text) {
    const words = text.split(' ')
    let remote = tgUsersCommandsTree
    for (const word of words) {
      if (typeof remote === 'function') {
        remote(word)
        return
      }

      remote = remote[word]

      if (!remote) {
        sendReply(config.msg.commandNotExitst)
        return
      }
    }
    if (typeof remote === 'function') {
      remote()
    } else {
      sendReply(`<b> ${Object.keys(remote).toString()}</b>? `)
    }
  }

  /** executing */

  const text = msg.text

  const res = executeTextCommand(text)

  console.log(res)

})
