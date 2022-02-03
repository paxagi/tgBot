const toCatch = fn => {
  return function(...args) {
    try {
      return fn(...args)
    } catch (error) {
      console.table(error);
    }
  }
}

const TelegramBot = require('node-telegram-bot-api')

const checkAccess = toCatch(require('./db').checkAccess)

const {
  wol,
  pcoff,
  token,
  bot: botConfig,
  MACs,
} = require('./config')
console.table({token, ...MACs})

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {
  console.log('onText: ',msg);
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, resp);
})

// onMessage event
bot.on('message', (msg) => {
  const chatId = msg.chat.id
  const name = msg.from.first_name
  const userid = msg.from.id
  
  // std input
  console.log(`${name}(${userid}): ${msg.text}`);
  
  const sendReply = (msg) => {
    bot.sendMessage(chatId, `${name}, ${msg}`, { parse_mode: 'HTML' })
  }
  
  const end = Symbol.for('end');
  const tgUsersCommandsTree = {
    'бот': {
      [end]: () => {
        bot.sendMessage(chatId,
          `бот разработан компанией ООО мега-трейд, разработчик / редактор кода: Роман Мамедов, Арафаилов Артем`)
        },
        'включи': {
          'комп': numb => {
            const n = Number(numb)
            const mac = MACs[n]
            const check = checkAccess(n, userid)
            console.log(check);
            if (!check.user) {
              sendReply('мимокрокодил')
              return
            }
            if (!check.access) {
              sendReply('вам запрещено')
              return
            }
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
            const n = Number(numb)
            const mac = MACs[n]
            const check = checkAccess(n, userid)
            console.log(check);
            if (!check.user) {
              sendReply('мимокрокодил')
              return
            }
          if (!check.access) {
            sendReply('вам запрещено')
            return
          }
          if (mac) {
            pcoff(n)
            sendReply(`выключаю комп ${n}`)
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
    let isEnd
    for (const word of words) {
      isEnd = false
      if (typeof remote === 'function') {
        remote(word)
        return
      }
      remote = remote[word]

      if (!remote) {
        sendReply(botConfig.messages.commandNotExist)
        return
      }
      if (remote[end]) isEnd = true
    }

    if (isEnd) {
      remote[end]()
      return
    }

    if (typeof remote === 'function') {
      remote()
      return
    }

    sendReply(`<b> ${Object.keys(remote).toString()}</b>?`)
    console.log(Object.keys(remote));
  }

  /** executing */

  const text = msg.text.toLowerCase()

  if (text.indexOf(botConfig.nickname) === 0) executeTextCommand(text)

})
