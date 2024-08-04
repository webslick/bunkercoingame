const { keyboard_main, inline_keyboard_main, inline_keyboard_offer, inline_keyboard_event, inline_keyboard_winner } = require('./keyboard')

// 📗📕 📃 📸 💵 ➖ ➕ ⚠️ 1⃣ 2⃣ 3⃣ 4⃣

const main = {
  text :``,
  buttons: keyboard_main
};
 
const inline_main = {
  text :``,
  buttons: inline_keyboard_main
};
 
const offer = {
  text :``,
  buttons: inline_keyboard_offer
}; 
 
const event = {
  text :``,
  buttons: inline_keyboard_event
}; 
 
const winners = {
  text :``,
  buttons: inline_keyboard_winner
}; 
  
function changePage(settings, type, pages) {  

  const admin_tg_ids = JSON.parse(settings.admin_tg_ids); 
  const welcome_message = settings.welcome_message;
  const winner_message = settings.winner_message;
  const event_message = settings.event_message; 
  
  console.log(settings,"settings")
  console.log(admin_tg_ids,"admin_tg_ids") 
  console.log(welcome_message,"welcome_message")
  console.log(winner_message,"winner_message")
  console.log(winner_message,"winner_message")
  console.log(event_message,"event_message") 

  let arr = '';

  switch (type) {
    case 'main': 
      pages.text = `*${`welcome_message`}* 
      *Наш бот поможет Вам:* 
      `
      break;
    case 'mainagain':
      info.possibility_main.map(element => {arr += "\n ✅ " + element +'\n'})
      pages.text = `
      *Наш бот поможет Вам:*\n${arr}\n ✅ База товаров обновляется *каждые 5 минут.*\n 
      *Вы находитесь в главном меню*\n\n
      `
      break;
   
    default:
      break;
  }
 
}
 
module.exports = {
  main,
  inline_main,
  offer, 
  event,
  winners,
  changePage, 
}
