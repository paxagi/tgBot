// const wol = require('wake_on_lan');
// const pcoff = require('./pcOff')
const wol = { wake: mac => console.log(mac) };
const pcoff = (id) => console.log(id);
const TelegramBot = require('node-telegram-bot-api');

const token = '';
const config = {
  msg: {
    commandNotExitst: 'не понимаю команду...',
  },
  bot: {
    nickname: 'бот',
  },
  MACs: {
    1: '',
    2: '',
    5: '',
    7: '',
    8: '',
    9: '',
    11: '',
    15: '',
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

  // std input
  console.log(`${name}(${msg.from.id}): ${msg.text}`);

  const sendReply = (msg) => {
    bot.sendMessage(chatId, `${name}, ${msg}`, { parse_mode: 'HTML' })
  }

  const tgUsersCommandsTree = {
    'бот': {
      'включи': {
        'комп': numb => {
          const mac = config.MACs[numb]
          if (mac) {
            sendReply('минутку, включаю...')
            wol.wake(mac)
          } else {
            sendReply('ПК с таким номером нет')
          }
        },
      },
      'выключи': {
        'комп': numb => {
          const mac = config.MACs[numb]
          if (mac) {
            pcoff(Number(numb))
            sendReply(`выключаю комп ${numb}`)
          } else {
            sendReply('ПК с таким номером нет')
          }
        },
      },
    },
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

  const text = msg.text.toLowerCase()

  if (text.indexOf(config.bot.nickname) === 0) executeTextCommand(text)

})
