var script1 = require('./pc1off.js');
var script2 = require('./pc2off.js');
var script5 = require('./pc5off.js');
var script7 = require('./pc7off.js');
var script8 = require('./pc8off.js');
var script9 = require('./pc9off.js');
var script11 = require('./pc11off.js');

const pcoff = require('./pcOff')

return

const TelegramBot = require('node-telegram-bot-api');
const token = '';

const bot = new TelegramBot(token, { polling: true });
bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, resp);
})

bot.on('message', (msg) => {
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

  const chatId = msg.chat.id

  if (msg.text.toLowerCase() === 'рестарт') {
    bot.sendMessage(chatId, "Это еще не реализовано")
  }
  // ПК 1 **********************************************************
  else if (msg.text.toLowerCase() === 'бот включи комп 1') {
    bot.sendMessage(chatId, "Минутку, включаю...")
    var wol = require('wake_on_lan');
    wol.wake('');
  }
  else if (msg.text.toLowerCase() === 'бот выключи комп 1') {
    bot.sendMessage(chatId, "Выключаю комп 1")
    script1.pcoff(compId);
  } // ПК 1 ------------------------------------------------------------




  // ПК 2 **********************************************************
  else if (msg.text.toLowerCase() === 'бот включи комп 2') {
    bot.sendMessage(chatId, "Минутку, включаю...")
    var wol = require('wake_on_lan');
    wol.wake('');
  }
  else if (msg.text.toLowerCase() === 'бот выключи комп 2') {
    bot.sendMessage(chatId, "Выключаю комп 2")
    script2.pc2off();
  } // ПК 2 ------------------------------------------------------------

  //ПК 5 ***********************************************************
  else if (msg.text.toLowerCase() === 'бот выключи комп 5') {
    bot.sendMessage(chatId, "Выключаю комп 5")
    script5.pc5off();
  }
  else if (msg.text.toLowerCase() === 'бот включи комп 5') {
    bot.sendMessage(chatId, "Минутку, включаю...")
    var wol = require('wake_on_lan');
    wol.wake('');
  } //ПК 5 -------------------------------------------------------------

  //ПК 7 ***********************************************************
  else if (msg.text.toLowerCase() === 'бот выключи комп 7') {
    bot.sendMessage(chatId, "Выключаю комп 7")
    script7.pc7off();
  }
  else if (msg.text.toLowerCase() === 'бот включи комп 7') {
    bot.sendMessage(chatId, "Минутку, включаю...")
    var wol = require('wake_on_lan');
    wol.wake('');
  } //ПК 7 -------------------------------------------------------------

  //ПК 8 ***********************************************************
  else if (msg.text.toLowerCase() === 'бот выключи комп 8') {
    bot.sendMessage(chatId, "Выключаю комп 8")
    script8.pc8off();
  }
  else if (msg.text.toLowerCase() === 'бот включи комп 8') {
    bot.sendMessage(chatId, "Минутку, включаю...")
    var wol = require('wake_on_lan');
    wol.wake('');
  } //ПК 8 -------------------------------------------------------------

  //ПК 9 ***********************************************************
  else if (msg.text.toLowerCase() === 'бот выключи комп 9') {
    bot.sendMessage(chatId, "Выключаю комп 9")
    script9.pc9off();
  }
  else if (msg.text.toLowerCase() === 'бот включи комп 9') {
    bot.sendMessage(chatId, "Минутку, включаю...")
    var wol = require('wake_on_lan');
    wol.wake('');
  } //ПК 9 -------------------------------------------------------------

  //ПК 11 ***********************************************************
  else if (msg.text.toLowerCase() === 'бот выключи комп 11') {
    bot.sendMessage(chatId, "Выключаю комп 11")
    script11.pc11off();
  }
  else if (msg.text.toLowerCase() === 'бот включи комп 11') {
    bot.sendMessage(chatId, "Минутку, включаю...")
    var wol = require('wake_on_lan');
    wol.wake('');
  } //ПК 11 -------------------------------------------------------------

  //ПК 15 ***********************************************************
  else if (msg.text.toLowerCase() === 'бот выключи комп 15') {
    bot.sendMessage(chatId, "Выключаю комп 15")
    script11.pc11off();
  }
  else if (msg.text.toLowerCase() === 'бот включи комп 15') {
    bot.sendMessage(chatId, "Минутку, включаю...")
    var wol = require('wake_on_lan');
    wol.wake('');
  } //ПК 15 -------------------------------------------------------------

  else if (msg.text.toLowerCase() === 'бот') {
    bot.sendMessage(chatId, "Я тут")
  }

  //	process.exit();
})
