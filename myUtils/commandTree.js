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