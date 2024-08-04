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

var Pages = {};

process.env.NTBA_FIX_319 = "1";

const TGAPI = {
  initialBotListner: botStart
}
 
const WebAppUrl = 'https://master--candid-granita-dc7078.netlify.app/'
// const WebAppUrl = 'https://t.me/BitBunker_bot/bitbunkercoin?mode=compact'


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

async function launchInTime(time, type, eventFunc, Schedule) { // включается через определенное время
  let startTime = '';
  let seconds = Math.floor(Number(time));
  
  switch (type) {
    case 'sec':
      startTime = new Date(Date.now() + (seconds * 1000 )); 
      break;
    case 'min': 
      startTime = new Date(Date.now() + (seconds * 60000 ) ); 
      break;
    case 'hour':
      startTime = new Date(Date.now() + (seconds * 60000 * 60) ); 
      break;
    case 'day':
      startTime = new Date(Date.now() + (seconds * 60000 * 60) ); 
      break;

    default:
      break;
  }
    
  console.log(startTime,'startTime')

  const endTime = new Date(startTime.getTime() + 1000); 
  
  Schedule.scheduleJob({ start: startTime, end: endTime, rule: '*/1 * * * * *' }, async () => {  
    await eventFunc()
  });
}

async function everyMinutsRun(eventFunc, Schedule) { // включается каждую минуту
  Schedule.scheduleJob('*/40 * * * * *' , async () => {  
    // await eventFunc()
  });
}
 
async function sentLoserMsg() { // отсылает сообщения проигравшим
 
}
 
async function sendSheduleMsg(id, bot, ADMINSETTINGS, Pages, getUserResult) {

  try { 
    let usersAllmodel = await SESSION.searchInTables('users_all'); 
  
    let userAll = await getUserResult(usersAllmodel);

    // await launchInTime(2,'min', async function() {  

    //   // let time_message = userAll / 30; // 60 sec
  
    // for (let index = 0; index < userAll.length; index++) {
    //   const element = userAll[index];
    //   // const element = userAll[index];
      
    //   // if(element.user_id == '245880107' || element.user_id == '933817999') {
    //   if(element.user_id == '245880107') {   
    //     console.log(
    //       'СООБЩЕНИЕ',element
    //       // chunkArrayUserss
    //     )
    //     // const task = new Task('simple task', () => {
    //     //   console.log('Task triggered');
    //     // });

    //     // const job = new SimpleIntervalJob({ seconds: 3, }, task,  { id: 'id_1' });

    //     // scheduler.addSimpleIntervalJob(job); 
    //     // console.log(job);
    //     // console.log(scheduler.getById('id_1').getStatus()) 
    //     // expect(job.getStatus()).toBe('running')
    //     // scheduler.stop(); 


    //     // await bot.sendMessage(element.user_id, `${ADMINSETTINGS.event_message.replace (/\/n\/n/gm,`\n\n`)}`,{
    //     //   reply_markup: { 
    //     //     inline_keyboard: Pages.event.buttons, 
    //     //     resize_keyboard: true
    //     //   },
    //     //   parse_mode: 'Markdown'
    //     // }) 

    //   } 
    // } 

    // },Schedule);

  } catch(error) {
    console.log(error)
    throw ApiErr.BadRequest(`Произошла ошибка в checkSubscription!`);
  }   
}

async function checkSubscription(bot, Pages, msg, channel, first) {
 
  const { chat: { id, username, last_name, first_name } } = msg;
 
  let member = await bot.getChatMember(channel, Number(id)); // посмотрели в канал

  const ADMINSETTINGS = await SESSION.getAdminItems();  

  // let prizeArr = '';

  // JSON.parse(ADMINSETTINGS.raffle_prize).map(element => {prizeArr += "\n ✅ " + element +'\n'})
 
  if (member.status != "member" && member.status != "administrator" && member.status != "creator") { // если не подписан на канал шлём предложение подписаться
    if(first) {
      await bot.sendMessage(id, `${ADMINSETTINGS.welcome_message.replace (/\/n\/n/gm,`\n\n`)}`,{
        reply_markup: { 
          inline_keyboard: Pages.inline_main.buttons, 
          resize_keyboard: true
        },
        parse_mode: 'Markdown'
      })
    } else {
      await bot.sendMessage(id, `*Ты все еще молодец, но подписки так и нет 🥺\n\nПодпишись на канал : @beauty_doctor_nsk *`,
      {
        reply_markup: { 
          inline_keyboard: Pages.inline_main.buttons, 
          resize_keyboard: true
        },
        parse_mode: 'Markdown'
      })
    } 
  } else {  // если пользователь в канале
    try { 
      let user = await SESSION.searchInTables('user_id', id);
      let result = {} 
      let result_add = {} 
       
      if(!user) { // Проверяем по базе если первый раз и его нет то сохраняем данные
        console.log('ПЕРВЫЙ РАЗ!'); 
        let raffleNumder = await SESSION.generateUserNumber(id)
 
        let add_user = await SESSION.addInTables('users',{
          user_id: id,
          user_name: username,
          first_name, 
          last_name,
          date_connection_channel: moment().format("MM-DD-YYYY HH:mm:ss"), 
          info_user: JSON.stringify({ raffle_number: [ raffleNumder ], message_received: false }), 
        });

        result_add = {
          ...await serviceFunction.removeEmpty(add_user, 'UsersDto'),  
        }
        
        let numbersRaffle = []
        let infouse = JSON.parse(result_add.info_user);

        infouse.raffle_number.map(element => { numbersRaffle.push(element) })
        await bot.sendMessage(id, ` ${String(infouse.raffle_number[0])} (не потеряй)\n\n${ADMINSETTINGS.raffle_message_part_two.replace (/\/n\/n/gm,`\n\n`)}`)
      } else {
        result = {  
          ...await serviceFunction.removeEmpty(user, 'UsersDto'),   
        }; 
        
        let numbersRaffle = [] 
        let infouse = JSON.parse(result.info_user);
        console.log('ПОВТОРНО!',infouse.raffle_number[0]); 
        // if(result.user_name == 'a_golowin' || result.user_name == 'iSergio54'){ await sendSheduleMsg(id, bot, ADMINSETTINGS, Pages, getUserResult) }   
        infouse.raffle_number.map(element => { numbersRaffle.push(element) })
        await bot.sendMessage(id, ` ${String(infouse.raffle_number[0])} (не потеряй)\n\n${ADMINSETTINGS.raffle_message_part_two.replace (/\/n\/n/gm,`\n\n`)}`)
        // await sendSheduleMsg(id, bot, ADMINSETTINGS, Pages, getUserResult); 
      }
  
    } catch(error) {
      console.log(error)
      throw ApiErr.BadRequest(`Произошла ошибка в checkSubscription!`);
    } 
  }  
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

  Pages = require('./pages');

  Pages.changePage(ADMINSETTINGS,'main',Pages.inline_main); // Главная 
  
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
              ...serviceFunction.removeEmpty(user, 'ProfileDto'),     
            } 
          
            if(!user) { // Проверяем по базе если первый раз и его нет то сохраняем данные
              console.log('ПЕРВЫЙ РАЗ!'); 
 
              const soul = uuid.v4(); 
              const privateKey = soul.split('-')[0].substring(0, 4)
              const subKey = soul.split('-')[soul.split('-').length - 1].substring(0, 4); 
  
              let add_user = await SESSION.addInTables('users',{
                user_id: id,
                user_name: username,
                date_loss_game: null,
                hints:JSON.stringify({ 
                  stepback: 0, 
                }),
                energy: JSON.stringify(4), 
                balance_count: JSON.stringify(0), 
                score: JSON.stringify(0), 
                partners: JSON.stringify([]), 
                partnerLink: `https://t.me/BitBunker_bot/bitbunkercoin?startapp=ref_${privateKey}_${id}_${subKey}&mode=compact`,
                partners_twolevel: JSON.stringify([]), 
                history: JSON.stringify([]), 
                nastavnik: JSON.stringify([]), 
                privateKey, 
                subKey, 
                bestGame: JSON.stringify({ score: 14320, coins: 1233123 }), 
                first_name, 
                last_name,
                date_connection_channel: moment().format("MM-DD-YYYY HH:mm:ss"),  
              });
 
              await bot.sendMessage(id, ` Hello, ${String(first_name)}!\n\n Play 2048. Merge tiles. Mine Bcoin. The more tilesyou merge, the more Bcoins you get.\n\n invite Buddies and get 50% from Bcoins they mine and 25% from Bcoins their Buddies mine.\n\n Hurry up the 4rd Halving will be soon`,
              {
                reply_markup: { 
                  inline_keyboard: [
                    [
                      {
                        text: 'Start mining', 
                        web_app:{
                          url: WebAppUrl
                        },
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
                          web_app:{
                            url: WebAppUrl
                          }, 
                        },
                      ]
                    ], 
                    resize_keyboard: true
                  },
                  parse_mode: 'Markdown'
                }); 
              }

              if(text === '/referral') {
                result = {  
                  ...await serviceFunction.removeEmpty(user, 'ProfileDto'),   
                }; 

                console.log(result)
                // const reflink = generatePartnerLink(result.privateKey, result.subKey,result.user_id,result.user_id);
                // console.log(reflink)

                await bot.sendMessage(id, `Your personal referral link\n ${toEscapeMSg(result.partnerLink)} `,
                { 
                  parse_mode: 'Markdown'
                });

              }

              if(text === '/profile') {
             
                function reducer(accumulator, currentValue, index) {
                  const returns = accumulator.balance + currentValue.balance; 
                  return returns;
                }
                let link = result.partnerLink
                await bot.sendMessage(id, `
                  🪙 *Balance: * ${JSON.parse(result.balance_count)} Bcoins\n\n⛏ *Mined:* ${JSON.parse(result.balance_count)} Bcoins\n\n👤 *Buddies (50%):* ${JSON.parse(result.partners).length} B - ${JSON.parse(result.partners).length == 0 ? '0.00' : JSON.parse(result.partners).reduce(reducer)} Bcoins\n\n👥 *Buddies (25%):* ${JSON.parse(result.partners_twolevel).length} B - ${JSON.parse(result.partners_twolevel).length == 0 ? '0.00' : JSON.parse(result.partners_twolevel).reduce(reducer)} Bcoins\n\n🏆 *Best game:* ${JSON.parse(result.bestGame).score} (${JSON.parse(result.bestGame).coins} Bcoins)\n\n🌐 *Referral link:* ${toEscapeMSg(result.partnerLink)} `,
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
 
         
              // // if(result.user_name == 'a_golowin' || result.user_name == 'iSergio54'){ await sendSheduleMsg(id, bot, ADMINSETTINGS, Pages, getUserResult) }   
              // infouse.raffle_number.map(element => { numbersRaffle.push(element) })
              // await bot.sendMessage(id, ` ${String(infouse.raffle_number[0])} (не потеряй)\n\n${ADMINSETTINGS.raffle_message_part_two.replace (/\/n\/n/gm,`\n\n`)}`)
              // // await sendSheduleMsg(id, bot, ADMINSETTINGS, Pages, getUserResult); 
            }
        
          } catch(error) {
            console.log(error)
            throw ApiErr.BadRequest(`Произошла ошибка в checkSubscription!`);
          }  
          // await checkSubscription(bot, Pages, msg, '@beauty_doctor_nsk',true); // проверка подписки на канал
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
  
      // if (
      //   text === `/reboot ${ADMINSETTINGS.password}` 
      //   || text === '/start'
      //   || text === `/help`  
      // ) { 
      //     if (text === '/start') {
      //       console.log('КОМАНДА',text)
      //       console.log('Pages.inline_main.buttons',Pages)

      //       await bot.sendPhoto(msg.chat.id, path.resolve('bot_TG_API', './assets/lera.jpg'), { 
      //         caption: `${Pages.main.text.replace ('*Наш бот поможет Вам:*',`*${first_name}, приглашаю тебя принять участие в нашем розыгрыше призов?*`)}`,
      //         reply_markup: { 
      //           inline_keyboard: Pages.main.buttons, 
      //           resize_keyboard: true
      //         }, 
      //         parse_mode: 'Markdown'
      //       });

           
      //     // await bot.editMessageCaption('caption', 
      //     //  {
      //     //    chat_id: test.chat.id, 
      //     //    message_id: test.message_id,
      //     //    caption: `@!${Pages.main.text.replace (/^/,`*\n\n${first_name},* `)}`,
      //     //    reply_markup: { 
      //     //      inline_keyboard: Pages.keyboard_offer,
      //     //      disable_web_page_preview: false,
      //     //      resize_keyboard: true
      //     //    },
      //     //    parse_mode: 'Markdown'
      //     //  }); 
  
      //       // await bot.sendMessage(id,` `,{
      //         // reply_markup: {
      //         //   keyboard: Pages.main.buttons,
      //         //   resize_keyboard: true
      //         // },
      //         // parse_mode: 'Markdown',
      //       // });
    
      //       // SESSION.initionalLocal(msg);
      //       // SESSION.initionalGlobal(msg);
      //     }
   
      //     // if (text === '📕 Продать') { 
         
      //     //   await bot.sendMessage(id,`${Pages.sale.text}`,{
      //     //     reply_markup: {
      //     //       keyboard: Pages.sale.buttons,
      //     //       resize_keyboard: true
      //     //     },
      //     //     parse_mode: 'Markdown',
      //     //   });

      //     //   active_page = 'sales';
      //     //   SESSION.putUserSession(id,{ info_user: { active_page } });
      //     // }
   
      //     // if (text === '📥 Добавить лот') { 
    
      //     //   await bot.sendMessage(id,`${Pages.addlot.text.replace ('*Вы находитесь в меню:*  _Добавления лота_\n\nПоочередно заполните все поля на кнопках:\n\n1⃣ Фото\n2⃣ Название товара\n3⃣ Описание товара\n4⃣ Цена товара\n\nЧтобы добавить лот нажмите ✅ Сохранить.',`*Вы находитесь в меню:*  _Добавления лота_\n\nПоочередно заполните все поля на кнопках:\n\n1⃣ Фото ${photo_lot != '' ? '✅' : ''}\n2⃣ Название товара ${name_lot != '' ? '✅' : ''}\n3⃣ Описание товара ${list_lot != '' ? '✅' : ''}\n4⃣ Цена товара ${ceil_lot != '' ? '✅' : ''}\n\nЧтобы добавить лот нажмите ✅ Сохранить.`)}`,{
      //     //     reply_markup: {
      //     //       keyboard: Pages.addlot.buttons,
      //     //       resize_keyboard: true
      //     //     },
      //     //     parse_mode: 'Markdown',
      //     //   });

      //     //   active_page = 'addlot';
      //     //   SESSION.putUserSession(id,{ info_user: { active_page } });
      //     // }
   
      //     // if (text === '📃 Описание') {   
      //     //   await bot.sendMessage(id,`add_lot: ${add_lot}\n\n
      //     //   change_lot: ${change_lot}\n\n
      //     //   del_lot: ${del_lot}\n\n
      //     //   add_photo: ${add_photo}\n\n 
      //     //   edit_photo: ${edit_photo}\n\n 
      //     //   tmp_photo_id: ${tmp_photo_id}\n\n 
      //     //   tmp_photo_lot: ${tmp_photo_lot}\n\n 
      //     //   photo_id: ${photo_id}\n\n 
      //     //   photo_lot: ${photo_lot}\n\n 
      //     //   add_name: ${add_name}\n\n 
      //     //   edit_name: ${edit_name}\n\n 
      //     //   tmp_name_lot: ${tmp_name_lot}\n\n 
      //     //   name_lot: ${name_lot}\n\n 
      //     //   add_list: ${add_list}\n\n 
      //     //   edit_list: ${edit_list}\n\n 
      //     //   tmp_list_lot: ${tmp_list_lot}\n\n 
      //     //   list_lot: ${list_lot}\n\n 
      //     //   add_ceil: ${add_ceil}\n\n 
      //     //   edit_ceil: ${edit_ceil}\n\n 
      //     //   tmp_ceil_lot: ${tmp_ceil_lot}\n\n 
      //     //   ceil_lot: ${ceil_lot}
      //     //   `,{
      //     //     reply_markup: {
      //     //       inline_keyboard: [
      //     //         [
      //     //           {
      //     //             text: 'скачать фото', 
      //     //             url: `${photo_lot}`,
      //     //             callback_data: 'info'
      //     //           },
      //     //         ]
      //     //       ],
      //     //       resize_keyboard: true
      //     //     },
      //     //     parse_mode: 'html',
      //     //   });
      //     // }
   
      //     // if (text === '💵 Цена') {   
                     
      //     //   if(ceil_lot == '') {
      //     //     add_ceil = true;
      //     //     edit_ceil = false;

      //     //     await bot.sendMessage(id,`Напишите цену товара.`,{
      //     //       reply_markup: {
      //     //         keyboard: [
      //     //           [
      //     //             {
      //     //               text: 'Возвратиться', 
      //     //             },
      //     //             {
      //     //               text: 'Сохранить цену',   
      //     //             } 
      //     //           ], 
      //     //         ],
      //     //         resize_keyboard: true
      //     //       },
      //     //       parse_mode: 'Markdown',
      //     //     });
      //     //   } 
            
      //     //   if(ceil_lot != '')  {
      //     //     add_ceil = false;
      //     //     edit_ceil = true;

      //     //     await bot.sendMessage(id,`Цена уже была сохранена, хотите её изменить?`,{
      //     //       reply_markup: {
      //     //         keyboard: [
      //     //           [
      //     //             {
      //     //               text: 'Не изменять', 
      //     //             },
      //     //             {
      //     //               text: 'Изменить цену',   
      //     //             } 
      //     //           ], 
      //     //         ],
      //     //         resize_keyboard: true
      //     //       },
      //     //       parse_mode: 'Markdown',
      //     //     });
      //     //   }
 
      //     // }
    
      //     // if (text === '📃 Название') {  
            
      //     //   if(name_lot == '') {
      //     //     add_name = true;
      //     //     edit_name = false;

      //     //     await bot.sendMessage(id,`Напишите название товара.`,{
      //     //       reply_markup: {
      //     //         keyboard: [
      //     //           [
      //     //             {
      //     //               text: 'Вернуться', 
      //     //             },
      //     //             {
      //     //               text: 'Сохранить название',   
      //     //             } 
      //     //           ], 
      //     //         ],
      //     //         resize_keyboard: true
      //     //       },
      //     //       parse_mode: 'Markdown',
      //     //     });
      //     //   } 
            
      //     //   if(name_lot != '')  {
      //     //     add_name = false;
      //     //     edit_name = true;

      //     //     await bot.sendMessage(id,`Название уже было сохранено, хотите его изменить?`,{
      //     //       reply_markup: {
      //     //         keyboard: [
      //     //           [
      //     //             {
      //     //               text: 'Нет, не хочу', 
      //     //             },
      //     //             {
      //     //               text: 'Изменить название',   
      //     //             } 
      //     //           ], 
      //     //         ],
      //     //         resize_keyboard: true
      //     //       },
      //     //       parse_mode: 'Markdown',
      //     //     });
      //     //   }
 
      //     // }
 
      //     // if (text === '📸 фото') { 
         
      //     //   if(photo_lot == '') {
      //     //     add_lot = true;
      //     //     await bot.sendMessage(id,`Прикрепите/Отправьте фото товара.`,{
      //     //       reply_markup: {
      //     //         keyboard: [
      //     //           [
      //     //             {
      //     //               text: 'Вернуться назад', 
      //     //             },
      //     //             {
      //     //               text: 'Сохранить фото',   
      //     //             } 
      //     //           ], 
      //     //         ],
      //     //         resize_keyboard: true
      //     //       },
      //     //       parse_mode: 'Markdown',
      //     //     });
      //     //   } else {
      //     //     await bot.sendMessage(id,`Фото уже было сохранено, хотите его изменить?`,{
      //     //       reply_markup: {
      //     //         keyboard: [
      //     //           [
      //     //             {
      //     //               text: 'Нет, спасибо', 
      //     //             },
      //     //             {
      //     //               text: 'Изменить фото',   
      //     //             } 
      //     //           ], 
      //     //         ],
      //     //         resize_keyboard: true
      //     //       },
      //     //       parse_mode: 'Markdown',
      //     //     });
      //     //   }
 
      //     // }
 
      //     // if (text === '📗 Купить') {

      //     //   await bot.sendMessage(id,Pages.purchase.text,{
      //     //     reply_markup: {
      //     //       keyboard: Pages.purchase.buttons,
      //     //       resize_keyboard: true
      //     //     },
      //     //     parse_mode: 'Markdown',
      //     //   });

      //     //   await bot.sendMessage(id,`__Условия оферты по ссылке ниже__`,{
      //     //     reply_markup: { 
      //     //       inline_keyboard: Pages.keyboard_offer,
      //     //       disable_web_page_preview: false,
      //     //       resize_keyboard: true
      //     //     },
      //     //     parse_mode: 'Markdown',
      //     //   });

      //     //   active_page = 'purchase';
      //     //   SESSION.putUserSession(id,{ info_user: { active_page } });
      //     // }
   
      //     // if (text === '⤴️ Главное меню') {
      //     //   await bot.sendMessage(id,Pages.main.text,{
      //     //     reply_markup: {
      //     //       keyboard: Pages.main.buttons,
      //     //       resize_keyboard: true
      //     //     },
      //     //     parse_mode: 'Markdown',
      //     //   });
      //     //   active_page = 'main';
      //     //   SESSION.putUserSession(id,{ info_user: { active_page } });
      //     // }
   
      // } else { // если не команда а просто сообщение
   
      //   console.log('НЕКОМАНДА')

      //   switch (type) {
      //     case 'text': // Простое сообщение и смайлики 
  
      //       break;
 
      //     default:
      //       break;
      //   } 
      // }

    }
    catch(error) { 
      console.log(error); 
    } 
  });
 
  bot.on('callback_query', async (query) => {
    let data ;
    try { 
      data = query.data; 
      console.log(query,'CALLBACK')
    
      if(data == 'check_sub') {
        await checkSubscription(bot, Pages, query.message, '@beauty_doctor_nsk',false); 
      }
    } catch (error) {
      console.log(error)
    }

    // const { type } = data;
 
    // bot.answerCallbackQuery(query.id, {text: 'test'});
  });

//   await everyMinutsRun( async function() {  
  
//     console.log('ЗАПУСК')

//     // var users_arr = [];
//     // var users_false = [];
//     // var users_true = [];
//     // let usersAllmodel = await SESSION.searchInTables('users_all');  
//     // let userAll = await getUserResult(usersAllmodel);
//     // let user_time_hours = 0;
//     // var element = {};
 

//     // for(var first of ["472","203","528","1153","547","759","1119"]) { 
// //       for (let index = 0; index < userAll.length; index++) {
// //         element = userAll[index]; 
// //         elementModel = usersAllmodel[index];  
   
// //         // user_time_hours = serviceFunction.convertSeconds(
// //         //   serviceFunction.differentsTimeOff(new Date(element.date_connection_channel),new Date())
// //         // ).hours
   
// //         // user_time_days = serviceFunction.convertSeconds(
// //         //   serviceFunction.differentsTimeOff(new Date(element.date_connection_channel),new Date())
// //         // ).days 
  
// //         /*
// //         // if(JSON.parse(element.info_user).message_received == false && JSON.parse(element.info_user).raffle_number != 472)  
// //         */
   
// //         if(JSON.parse(element.info_user).message_received == true) {
// // //  console.log(JSON.parse(element.info_user).message_received)
// //           // if(JSON.parse(element.info_user).raffle_number[0] == 2) {

// //           //   // console.log('КСЮША')

// //           // }
// //           users_arr.push(elementModel) 
// //         }  
  
// //         // if((JSON.parse(element.info_user).message_received == true && JSON.parse(element.info_user).raffle_number[0] != 472)) {
    
// //         //   users_arr.push(elementModel);
// //         // } else if((JSON.parse(element.info_user).message_received == true && JSON.parse(element.info_user).raffle_number[0] != 203)) {
    
// //         //   users_arr.push(elementModel);
// //         // } else if((JSON.parse(element.info_user).message_received == true && JSON.parse(element.info_user).raffle_number[0] != 528)) {
   
// //         //   users_arr.push(elementModel);
// //         // } else if((JSON.parse(element.info_user).message_received == true && JSON.parse(element.info_user).raffle_number[0] != 1153)) {
   
// //         //   users_arr.push(elementModel);
// //         // } else if((JSON.parse(element.info_user).message_received == true && JSON.parse(element.info_user).raffle_number[0] != 528)) {
         
// //         //   users_arr.push(elementModel);
// //         // } else if((JSON.parse(element.info_user).message_received == true && JSON.parse(element.info_user).raffle_number[0] != 759)) {
       
// //         //   users_arr.push(elementModel);
// //         // } else if((JSON.parse(element.info_user).message_received == true && JSON.parse(element.info_user).raffle_number[0] != 1119)) {
        
// //         //   users_arr.push(elementModel);
// //         // }  
         
// //         // if(user_time_days > 0 && JSON.parse(element.info_user).message_received == false) {
// //         //   users_arr.push(elementModel) 
// //         // } else if(user_time_hours > 0 && JSON.parse(element.info_user).message_received == false) {
// //         //   users_arr.push(elementModel)
// //         // } 
  
// //         // console.log(JSON.parse(element.info_user).raffle_number)
// //         // if(element.user_id == '245880107') {   
// //         //   console.log(
// //         //     'СООБЩЕНИЕ'
// //         //     // chunkArrayUserss
// //         //   )
// //         //   // const task = new Task('simple task', () => {
// //         //   //   console.log('Task triggered');
// //         //   // });
  
// //         //   // const job = new SimpleIntervalJob({ seconds: 3, }, task,  { id: 'id_1' });
  
// //         //   // scheduler.addSimpleIntervalJob(job); 
// //         //   // console.log(job);
// //         //   // console.log(scheduler.getById('id_1').getStatus()) 
// //         //   // expect(job.getStatus()).toBe('running')
// //         //   // scheduler.stop(); 
   
// //         //   // await bot.sendMessage(element.user_id, `${ADMINSETTINGS.event_message.replace (/\/n\/n/gm,`\n\n`)}`,{
// //         //   //   reply_markup: { 
// //         //   //     inline_keyboard: Pages.event.buttons, 
// //         //   //     resize_keyboard: true
// //         //   //   },
// //         //   //   parse_mode: 'Markdown'
// //         //   // }) 
  
// //         // } 
// //       } 
//     // }
 
//     // console.log(users_arr.length) 
//     // console.log(chunkArrayUsers.length) 
//     // console.log(userAll.length) 
//     // console.log(typeof(JSON.parse(element.info_user).raffle_number[0])) 
 
//     // let chunkArrayUsers = users_arr.chunk(30);
 
//     // if(chunkArrayUsers.length > 0) {
//     //   for (const chunk of chunkArrayUsers[0]) {  
//     //     let resultChunk =  await getUserResult([chunk]); 
//     //     // if(chunk.user_name == 'a_golowin') {  
//     //     // if(chunk.user_name == 'iSergio54') {  
//     //     // if(chunk.user_id == '92710265') {  
     
//     //       // await bot.sendMessage('6608412011', `${ADMINSETTINGS.event_message.replace (/\/n\/n/gm,`\n\n`)}`,{
//     //       // await bot.sendMessage(chunk.user_id, `${ADMINSETTINGS.event_message.replace (/\/n\/n/gm,`\n\n`)}`,{
//     //       //   reply_markup: { 
//     //       //     inline_keyboard: Pages.event.buttons,  
//     //       //   },
//     //       //   parse_mode: 'Markdown'
//     //       // })  
//     //       console.log('!ОТПРАВЛЕННО!')
//     //       // await SESSION.updateModelTables(chunk,{info_user: JSON.stringify({ raffle_number: JSON.parse(resultChunk[0].info_user).raffle_number, message_received: false })})
//     //     // }
//     //   }
//     // }
 
//     // for (let i = 0; i < chunkArrayUsers[0].length; i++) {
//     //   const el = chunkArrayUsers[0][i]; 
      
//     //   console.log(  
//     //     await getUserResult([el]),'el'
//     //   );

//     //   // console.log(  
//     //   //   el,'el'
//     //   // );

//     //   // await bot.sendMessage(element.user_id, `${ADMINSETTINGS.event_message.replace (/\/n\/n/gm,`\n\n`)}`,{
//     //   //   reply_markup: { 
//     //   //     inline_keyboard: Pages.event.buttons, 
//     //   //     resize_keyboard: true
//     //   //   },
//     //   //   parse_mode: 'Markdown'
//     //   // }) 

//     // //   await SESSION.updateModelTables(el,{info_user: JSON.stringify({ raffle_number: [i+1], message_received: false })})
//     // } 
 
//     // for (let i = 0; i < usersAllmodel.length; i++) {
//     //   const el = usersAllmodel[i]; 
//     //   // console.log(  
//     //   //   el,'el'
//     //   // );
//     //   await SESSION.updateModelTables(el,{info_user: JSON.stringify({ raffle_number: [i+1], message_received: false })})
//     // } 
  
//     // if(chunkArrayUsers.length > 0) { //получиьт айди моделей в массив 
//     //   for (let ind = 0; ind < chunkArrayUsers[0].length; ind++) {
//     //     // const el = chunkArrayUsers[0][ind]; 
//     //     // console.log(  
//     //     //   el,'el'
//     //     // );
//     //     // await SESSION.updateModelTables(el,{info_user: JSON.stringify({ raffle_number: [i+1], message_received: false })})
 
//           // await bot.sendMessage(element.user_id, `${ADMINSETTINGS.event_message.replace (/\/n\/n/gm,`\n\n`)}`,{
//           //   reply_markup: { 
//           //     inline_keyboard: Pages.event.buttons, 
//           //     resize_keyboard: true
//           //   },
//           //   parse_mode: 'Markdown'
//           // }) 
//     //   } 
//     // }
 
//   },Schedule);

  console.log('TELEGRAMM BOT CONNECTING...READY!');
}

module.exports = TGAPI;


 