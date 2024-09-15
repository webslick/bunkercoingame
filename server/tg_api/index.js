const TelegramBot = require('node-telegram-bot-api');  
const SESSION = require('../db/index');  
const moment = require('moment');
const uuid = require('uuid')
const serviceFunction = require("../service_functions")
const ApiErr = require('../exeptions/api-error');  
 
require('dotenv').config();
 
process.env.NTBA_FIX_319 = "1";

const TGAPI = {
  initialBotListner: botStart
}
  
const WebAppUrl = 'https://t.me/BitBunker_bot/bitbunkercoin'
 
Object.defineProperty(Array.prototype, 'chunk', {
  value: function(chunkSize) {
    var R = [];
    for (var i = 0; i < this.length; i += chunkSize)
      R.push(this.slice(i, i + chunkSize));
    return R;
  }
});

const isEmptyObject = (obj) => {
  for (var i in obj) { 
      if (obj.hasOwnProperty(i)) {
          return false;
      }
  }
  return true;
}
   
function toEscapeMSg(str) {
  return str
      .replace(/_/gi, "\\_")
      .replace(/-/gi, "\\-")
      // .replace("~", "\\~")
      // .replace(/`/gi, "\\`")
      // .replace(/\./g, "\\.");
}
 
async function botStart (ADMINSETTINGS) {
  
  const bot = new TelegramBot(process.env.TGBOT_API_KEY, { polling: {
    interval: 300,
    autoStart: true,
    params: {
      timeout: 10
    }
  } });
  
  bot.on('message', async (msg) => {
    try { 

      const { text, chat: { id, username, last_name, first_name } } = msg;
 
      const command = text.split(' ');
 
      if (command.length === 1) { // Ввод команды пользователем 
        if ( 
          text === '/start' || 
          text === '/profile' || 
          text === '/referral' || 
          text === '/faq' ||  
          text === `/help` 
        ) { 

          console.log('КОМАНДА');  
          
          try { 
            const user = await SESSION.searchInTables('user_id', id);
            var result = {}  
                   
            result = {
              ...serviceFunction.removeEmpty(user, 'Profiles'),     
            } 
             
            if(!user) { // Проверяем по базе если первый раз и его нет то сохраняем данные
              console.log('ПЕРВЫЙ РАЗ!'); 
 
              const soul = uuid.v4(); 
              const privateKey = soul.split('-')[0].substring(0, 4)
              const subKey = soul.split('-')[soul.split('-').length - 1].substring(0, 4); 
  
              let add_user = await SESSION.addInTables('users',{
                user_id: id,
                user_name: username != null ? username :
                last_name != null ? last_name :
                first_name != null ? first_name : 'No name',
                date_loss_game: null,
                hints:JSON.stringify({ 
                  stepback: 0, 
                }),
                energy: JSON.stringify(4), 
                balance_count: JSON.stringify(0), 
                score: JSON.stringify(0), 
                partners: JSON.stringify([]), 
                partnerLink: `https://t.me/BitBunker_bot/bitbunkercoin?startapp=ref_${privateKey}_${id}_${subKey}`,
                partners_twolevel: JSON.stringify([]), 
                history: JSON.stringify([]), 
                boardstate: JSON.stringify({}), 
                nastavnik: JSON.stringify([]), 
                privateKey, 
                subKey, 
                wait: 0,
                bestGame: JSON.stringify({ 
                  daily_place: 0,
                  all_place: 0,
                  daily: {
                    score: 0, 
                    coins: 0 
                  },
                  all_time: {
                    score: 0, 
                    coins: 0 
                  } 
                }), 
                first_name, 
                last_name,
                date_connection_channel: moment().format("YYYY-MM-DD HH:mm"),  
              });
 
              await bot.sendMessage(id, ` Hello, ${String(first_name)}!\n\n Play 2048. Merge tiles. Mine BitBunke. The more tilesyou merge, the more BitBunke you get.\n\n invite Buddies and get 50% from BitBunke they mine and 25% from BitBunke their Buddies mine.\n\n Hurry up, others have already started earning!`,
              {
                reply_markup: { 
                  inline_keyboard: [
                    [
                      {
                        text: 'Start mining', 
                        // web_app:{
                          url: WebAppUrl
                        // },
                      },
                    ]
                  ], 
                  resize_keyboard: true
                },
                parse_mode: 'Markdown'
              });

            } else {
              console.log('ПОВТОРНО!'); 

              if(text === '/start') { 
                await bot.sendMessage(id, ` Hello, ${String(first_name)}!\n\n Play 2048. Merge tiles. Mine BitBunke. The more tilesyou merge, the more BitBunke you get.\n\n invite Buddies and get 50% from BitBunke they mine and 25% from BitBunke their Buddies mine.\n\n Hurry up, others have already started earning!`,
                {
                  reply_markup: { 
                    inline_keyboard: [
                      [
                        {
                          text: 'Start mining', 
                          // web_app:{
                            url: WebAppUrl
                          // }, 
                        },
                      ]
                    ], 
                    resize_keyboard: true
                  },
                  parse_mode: 'Markdown'
                }); 
              }

              if(text === '/referral') { 

                let partnerLink = 'empty'; 

                if(!isEmptyObject(result)) {  
                  partnerLink  =  toEscapeMSg(result.partnerLink);
                }

                await bot.sendMessage(id, `Your personal referral link\n ${partnerLink} `,
                { 
                  parse_mode: 'Markdown'
                });

              }

              if(text === '/profile') {
          
                function reducer(accumulator, currentValue, index) {
                  const returns = { name: accumulator.name, total_coins: accumulator.total_coins + currentValue.total_coins }; 
                  return returns;
                }
            
                let balance_count = 'empty';
                let partners = 'empty';
                let partners_count = 'empty';
                let partners_twolevel = 'empty';
                let partners_twolevel_count = 'empty';
                let bestGameScore = 'empty';
                let bestGameCoins = 'empty';
                let partnerLink = 'empty';

                if(!isEmptyObject(result)) { 
                  balance_count = JSON.parse(result.balance_count);
                  partners = JSON.parse(result.partners).length; 
                  partners_count = JSON.parse(result.partners).length == 0 ? '0.00' : JSON.parse(result.partners).reduce(reducer).total_coins / 2;
                  partners_twolevel = JSON.parse(result.partners_twolevel).length;
                  partners_twolevel_count = JSON.parse(result.partners_twolevel).length == 0 ? '0.00' : JSON.parse(result.partners_twolevel).reduce(reducer).total_coins / 4;
                  bestGameScore = JSON.parse(result.bestGame).all_time.score;
                  bestGameCoins = JSON.parse(result.bestGame).all_time.coins;
                  partnerLink =  toEscapeMSg(result.partnerLink);
                }
 
                await bot.sendMessage(id, `
                  🪙 *Balance: * ${ balance_count + partners_count + partners_twolevel_count } BitBunke\n\n⛏ *Mined:* ${balance_count} BitBunke\n\n👤 *Buddies (50%):* ${partners} B - ${partners_count} BitBunke\n\n👥 *Buddies (25%):* ${partners_twolevel} B - ${partners_twolevel_count} BitBunke\n\n🏆 *Best game:* ${bestGameScore} (${bestGameCoins} BitBunke)\n\n🌐 *Referral link:* ${partnerLink} `,
                {
                  parse_mode: 'Markdown'
                })
              }

              if(text === '/faq') {
                await bot.sendMessage(id, `
                  *How 2 Bicon?*\n\n*Merge to Earn*\n\nBcoin2048 is a viral game where you mine BitBunke by mergining tiles through the popular 2048 mechanic.\n\n*Buddies*\n\nInvite Buddies and get 50% from BitBunke they mine and 25% from BitBunke their Buddies mine.\n\n*Halving*\n\nAfter mining half of the BitBunke, the number of BitBunke you earn for merginingtiles will be reduced.`,
                {
                  parse_mode: 'Markdown'
                })
              } 
            }
        
          } catch(error) {
            console.log(error)
            throw ApiErr.BadRequest(`Произошла ошибка в checkSubscription!`);
          }   
        } else { 
          console.log('СООБЩЕНИЕ', msg.chat.username)
        }
      }
 
      if (command.length === 2) { // переход по ссылке с дополнительным параметром 
 
        if(command[1].split('-')[0] === 'ref') {
          console.log('переход по реферальной ссылке')
          console.log(command[1]) 
        }  
 
      }
       
      if(msg?.web_app_data?.data) {
        console.log('DATA COMPLITED!!!!')
        try {
            const data = JSON.parse(msg?.web_app_data?.data)
            console.log(data)  
        } catch (e) {
            console.log(e);
        }
      } 
    }
    catch(error) { 
      console.log(error); 
    } 
  });
   
  console.log('TELEGRAMM BOT CONNECTING...READY!');
}

module.exports = TGAPI;


 
