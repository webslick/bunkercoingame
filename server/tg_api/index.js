const TelegramBot = require('node-telegram-bot-api'); 
const  Schedule  =  require ( 'node-schedule' ) ;
const { ToadScheduler, SimpleIntervalJob, Task, AsyncTask } = require('toad-scheduler');
const scheduler = new ToadScheduler();
const fs = require('fs');
const path = require('path');
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
 
// const WebAppUrl = 'https://candid-granita-dc7078.netlify.app'
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
 
const generatePartnerLink = (privateKey, subKey, user_id, sub_id) => {
  return `${privateKey}_${user_id}_${subKey}_${sub_id}`
}
 
async function getUserResult(model) {
  let result = {};
  let userArr = [];

  for (let index = 0; index < model.length; index++) {
    const element = model[index];
    result = {    
      ...await serviceFunction.removeEmpty(element, 'UsersDto'),   
    };
    userArr.push(result);
  }
 
 return userArr;
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
  
  bot.on('message', async (msg, { type }) => {
    try { 

      const { text, chat: { id, username, last_name, first_name } } = msg;
console.log(msg)

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
 
              await bot.sendMessage(id, ` Hello, ${String(first_name)}!\n\n Play 2048. Merge tiles. Mine Bcoin. The more tilesyou merge, the more Bcoins you get.\n\n invite Buddies and get 50% from Bcoins they mine and 25% from Bcoins their Buddies mine.\n\n Hurry up the 4rd Halving will be soon`,
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
                await bot.sendMessage(id, ` Hello, ${String(first_name)}!\n\n Play 2048. Merge tiles. Mine Bcoin. The more tilesyou merge, the more Bcoins you get.\n\n invite Buddies and get 50% from Bcoins they mine and 25% from Bcoins their Buddies mine.\n\n Hurry up the 4rd Halving will be soon`,
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
                  console.log('$#@')
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
                  🪙 *Balance: * ${ balance_count + partners_count + partners_twolevel_count } Bcoins\n\n⛏ *Mined:* ${balance_count} Bcoins\n\n👤 *Buddies (50%):* ${partners} B - ${partners_count} Bcoins\n\n👥 *Buddies (25%):* ${partners_twolevel} B - ${partners_twolevel_count} Bcoins\n\n🏆 *Best game:* ${bestGameScore} (${bestGameCoins} Bcoins)\n\n🌐 *Referral link:* ${partnerLink} `,
                {
                  parse_mode: 'Markdown'
                })
              }

              if(text === '/faq') {
                await bot.sendMessage(id, `
                  *How 2 Bicon?*\n\n*Merge to Earn*\n\nBcoin2048 is a viral game where you mine Bcoin by mergining tiles through the popular 2048 mechanic.\n\n*Buddies*\n\nInvite Buddies and get 50% from Bcoins they mine and 25% from Bcoins their Buddies mine.\n\n*Halving*\n\nAfter mining half of the Bcoins, the number of Bcoins you earn for merginingtiles will be reduced.`,
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

        // if(command[1] === 'raffle') { // Розыгрыш
        //   await checkSubscription(bot, Pages, msg, '@beauty_doctor_nsk',true); 
        // }
        console.log(command)
        if(command[1].split('-')[0] === 'ref') {
          console.log('переход по реферальной ссылке')
          console.log(command[1])

          // if(!isEmptyObject(cookies)) { 
          //   if (typeof cookies['partnersLink'] !== "undefined") {
          //     boss = await DB.searchInTables('user_info',{ idLink: cookies.partnersLink }); 
          //     if(boss) { 
          //       bossDto = { 
          //         ...serviceFunction.removeEmpty(boss, 'Users'),   
          //         ...serviceFunction.removeEmpty(boss, 'AuthInfos'),      
          //       };  
          //       nastavnik = bossDto.login;  
          //     } 
          //   }
          // }
   
          // if(!isEmptyObject(cookies)) { 
          //   if (typeof cookies['partnersLink'] !== "undefined") { 
          //     if(boss) { 
          //       partners = JSON.parse(bossDto.partners);
          //       partners.push({ email: login, money: 0 });  
          //       let partnersJSON = JSON.stringify(partners); 
          //       await DB.updateModelTables(boss,{ partners: partnersJSON }); 
          //     } 
          //   }
          // }

 
        }  

        if ( command[0] === `/win` ) {
        
          const adminuser = await SESSION.searchInTables('user_admin',{ id: 1 });
 
          if(!adminuser) {
            throw ApiErr.BadRequest(`Пользователь не найден`);
          } else {
            let adminId = JSON.parse(ADMINSETTINGS.admin_tg_ids); 
            
            for (let index = 0; index < adminId.length; index++) {
              const element = adminId[index]; 
              if(element == msg.chat.id) {
                var arrWinners = command[1].split(',')
                console.log('ADMIN',arrWinners)
                if(arrWinners.length != 7) {
                  await bot.sendMessage(msg.chat.id, `Необходимо передать сразу все 7 номеров победителей через запятую, после команды \"/win\" ( Пример /win 1,23,2,4,54,612,12 ).`,{}) 
                } else {
  
                  var users_arrs = [];
                  let usersAllmodels = await SESSION.searchInTables('users_all');  
                  let userAlls = await getUserResult(usersAllmodels);
        
                  var elt = [{}];
              
                  for (let index = 0; index < userAlls.length; index++) {
                    elt = userAlls[index]; 
                    elementModel = usersAllmodels[index];  
                
                    for (let ink = 0; ink < arrWinners.length; ink++) {
                      const elwin = arrWinners[ink]; 
                      if(JSON.parse(elt.info_user).raffle_number[0] == elwin) { 
                        users_arrs.push(elementModel) 
                      }
                    }  
                  }  
  
                  if(users_arrs.length == 7) {
                
                    // console.log(users_arrs)

                    bot.sendMessage('1076770866', `${ADMINSETTINGS.winner_message.replace (/\/n\/n/gm,`\n\n`)}`,{
                      reply_markup: { 
                        inline_keyboard: Pages.winners.buttons,  
                      },
                      parse_mode: 'Markdown'
                    }).then(function(resp) {
                      console.log('resp',resp)
                    }).catch(function(error) {
                      if (error.response && error.response.statusCode === 403) {
                        console.log('error',error)
                      }
                    });




                    bot.start((ctx) => {
                      ctx.reply('random example')
                      if (!data.includes(ctx.chat.id)){
                        data.push(ctx.chat.id);
                        fs.writeFileSync('./data2.json', JSON.stringify(data))
                        console.log('save :' + ctx.chat.id)
                       }
                    })
                    
                    
                     setInterval(async function(){ 
                        const date = new Date(); 
                          if (date.getMinutes() === 52){   
                            for(let lop of data){
                               await bot.telegram.sendVideo (lop, {url: "https://example.com/test.mp4"})
                               .catch((error) => { 
                              var del = data.indexOf(error.on.payload.chat_id);
                              data.splice(del,1)
                              fs.writeFileSync('./data2.json', JSON.stringify(data))
                              console.log('delete :' + error.on.payload.chat_id)
                    
                             });
                            }
                          } 
                      } , 60000);

 






                    // await bot.sendMessage('1293324730', `${ADMINSETTINGS.winner_message.replace (/\/n\/n/gm,`\n\n`)}`,{
                    //   reply_markup: { 
                    //     inline_keyboard: Pages.winners.buttons,  
                    //   },
                    //   parse_mode: 'Markdown'
                    // })   
            
                    // await bot.sendMessage('873009847', `${ADMINSETTINGS.winner_message.replace (/\/n\/n/gm,`\n\n`)}`,{
                    //   reply_markup: { 
                    //     inline_keyboard: Pages.winners.buttons,  
                    //   },
                    //   parse_mode: 'Markdown'
                    // })   
                 
                    // await bot.sendMessage('1245339258', `${ADMINSETTINGS.winner_message.replace (/\/n\/n/gm,`\n\n`)}`,{
                    //   reply_markup: { 
                    //     inline_keyboard: Pages.winners.buttons,  
                    //   },
                    //   parse_mode: 'Markdown'
                    // })   
                 
                    // !!!!!! await bot.sendMessage('1076770866', `${ADMINSETTINGS.winner_message.replace (/\/n\/n/gm,`\n\n`)}`,{
                    //   reply_markup: { 
                    //     inline_keyboard: Pages.winners.buttons,  
                    //   },
                    //   parse_mode: 'Markdown'
                    // })   
        
                    // await bot.sendMessage('954944096', `${ADMINSETTINGS.winner_message.replace (/\/n\/n/gm,`\n\n`)}`,{
                    //   reply_markup: { 
                    //     inline_keyboard: Pages.winners.buttons,  
                    //   },
                    //   parse_mode: 'Markdown'
                    // })   
                 
                    // await bot.sendMessage('5852722957', `${ADMINSETTINGS.winner_message.replace (/\/n\/n/gm,`\n\n`)}`,{
                    //   reply_markup: { 
                    //     inline_keyboard: Pages.winners.buttons,  
                    //   },
                    //   parse_mode: 'Markdown'
                    // })   
  
                    // await bot.sendMessage('5048509986', `${ADMINSETTINGS.winner_message.replace (/\/n\/n/gm,`\n\n`)}`,{
                    //   reply_markup: { 
                    //     inline_keyboard: Pages.winners.buttons,  
                    //   },
                    //   parse_mode: 'Markdown'
                    // })   

                    console.log('СООБЩЕНИЕ ОТПРАВЛЕННО!')



                    // for (const usr of users_arrs) {   
                    //   if(usr.user_id != '1293324730') {   
                    //     await bot.sendMessage(usr.user_id, `${ADMINSETTINGS.winner_message.replace (/\/n\/n/gm,`\n\n`)}`,{
                    //       reply_markup: { 
                    //         inline_keyboard: Pages.winners.buttons,  
                    //       },
                    //       parse_mode: 'Markdown'
                    //     })   
                    //   }
                    // } 
                  } 
                } 
              }
            } 
            // await SESSION.updateModelTables(adminuser,{ id: 1, winner_tg_ids: JSON.stringify(arrWinners) })
          }
 
        }

        if ( command[0] === `/looser` &&  command[1] === `send` ) { 
 
          const ARRAYinfo = await SESSION.getAdminItems();  
          // const ARRAYWINNERS = ARRAYinfo.winner_tg_ids;  


            let adminId = JSON.parse(ADMINSETTINGS.admin_tg_ids); 
          
            for (let index = 0; index < adminId.length; index++) {
              const element = adminId[index]; 
  
              if(element == msg.chat.id) {
    
                var looser_arrs = [];
        
                let allsUsersModels = await SESSION.searchInTables('users_all');  
                let allsUsers = await getUserResult(allsUsersModels);
      
                var usersElement = [{}];
       
             
                for (let k = 0; k < allsUsers.length; k++) {
                  usersElement = allsUsers[k]; 
                  elentModel = allsUsersModels[k];  
              
                  // for (let t = 0; t < ARRAYWINNERS.length; t++) {
                  //   const elwiner = ARRAYWINNERS[t]; 
                  //   if(JSON.parse(usersElement.info_user).raffle_number[0] == elwiner) { 
                  //     looser_arrs.push(elentModel) 
                  //   }
                  // } 
            
                }  
     
                // console.log (ARRAYWINNERS,'WINNERS')
                console.log (allsUsers.length,'allsUsers')
                console.log (looser_arrs.length,'allsUsers') 
              

                Schedule.scheduleJob('* * * * *' , async () => {  
                  var partsArrayUsers = looser_arrs.chunk(30);
 
                  if(partsArrayUsers.length > 0) {
                    for (const partition of partsArrayUsers[0]) {  
                      let resultpartition =  await getUserResult([partition]); 
                      // if(chunk.user_name == 'a_golowin') {  
                        await bot.sendMessage(partition.user_id, `${ADMINSETTINGS.event_message.replace (/\/n\/n/gm,`\n\n`)}`,{
                          reply_markup: { 
                            inline_keyboard: Pages.event.buttons,  
                          },
                          parse_mode: 'Markdown'
                        })  
              
                        await SESSION.updateModelTables(chunk,{info_user: JSON.stringify({ raffle_number: JSON.parse(resultChunk[0].info_user).raffle_number, message_received: true })})
                      // }
                    }
                  }
                });

                // if(users_arrs.length == 7) {
                //   for (const usr of users_arrs) {   
                //     if(usr.user_name == 'a_golowin') {  
                //     // if(usr.user_id == '882939547') {  
                //       await bot.sendMessage(usr.user_id, `${ADMINSETTINGS.winner_message.replace (/\/n\/n/gm,`\n\n`)}`,{
                //         reply_markup: { 
                //           inline_keyboard: Pages.winners.buttons,  
                //         },
                //         parse_mode: 'Markdown'
                //       })   
                //     }
                //   } 
                // }  
   
              }
            }
          // }




        }

      }
       
      if(msg?.web_app_data?.data) {
        console.log('DATA COMPLITED!!!!')
        try {
            const data = JSON.parse(msg?.web_app_data?.data)
            console.log(data)
            // await bot.sendMessage(chatId, 'Спасибо за обратную связь!')
            // await bot.sendMessage(chatId, 'Ваша страна: ' + data?.country);
            // await bot.sendMessage(chatId, 'Ваша улица: ' + data?.street);

            // setTimeout(async () => {
            //     await bot.sendMessage(chatId, 'Всю информацию вы получите в этом чате');
            // }, 3000)

            // await bot.answerWebAppQuery(queryId,{
            //   type: 'article',
            //   id: queryId,
            //   title: 'Выйгран приз',
            //   input_message_content: {
            //     message_text: 'Поздравляем вы выйграли ЛИцо в гавно!'
            //   }
              
            // });


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


 
