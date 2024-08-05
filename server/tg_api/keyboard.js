
const keyboard_main = [
  [
    {
      text: '📗 Купить', 
    },
    {
      text: '📕 Продать',  
    } 
  ], 
];
 
const inline_keyboard_main = [
  [ 
    {
      text: '⤴️ Проверить подписку ⤴️',
      // url: 'https://t.me/BeautyDoctorNSK_bot?start=raffle',
      callback_data: 'check_sub'
    } 
  ], 
];

const inline_keyboard_offer = [
  [
    {
      text: 'Правовая информация', 
      // url: 'https://telegra.ph/Dogovor-Oferta-10-09-2',
      callback_data: 'info'
    },
  ]
];

const inline_keyboard_event = [
  [
    {
      text: 'Хочу воспользоваться акцией', 
      url: 'https://wa.me/79139169290?text=Здравствуйте,%20Хочу%20воспользоваться%20акцией.',  
      // url: 'tg://msg?text=Хочу воспользоваться акцией&to=bogdashkina154',
      // url: 'tg://msg?text=Хочу воспользоваться акцией&to=+79139169290',
      // url: 'tg://msg?text=Этотестовоесообщение&to=+79139169290', 
      // url: 'tg://resolve?domain=+79139169290', 
      // url: 'https://t.me/+79139169290?text=Хочу воспользоваться акцией',
      // callback_data: 'c'
    },  
  ],
  [ 
    {
      text: 'Хочу онлайн консультацию', 
      // url: 'https://t.me/+79139169290',
      url: 'https://wa.me/79139169290?text=Здравствуйте,%20Хочу%20онлайн%20консультацию.',
      // callback_data: 'info'
    },
  ]
];

const inline_keyboard_winner = [
  [
    {
      text: '! Получить подарок !', 
      // url: 'https://wa.me/79139169290?text=Здравствуйте,%20Хочу%20воспользоваться%20акцией.',  
      // url: 'tg://msg?text=Хочу воспользоваться акцией&to=bogdashkina154',
      // url: 'tg://msg?text=Хочу воспользоваться акцией&to=+79139169290', 
      // url: 'tg://resolve?domain=+79139169290', 
       url: 'https://t.me/+79139169290',
      // callback_data: 'c'
    },  
  ] 
];
 
module.exports = {
  keyboard_main,
  inline_keyboard_main,
  inline_keyboard_offer,
  inline_keyboard_event,
  inline_keyboard_winner
}



  // {
  //   text: 'Да, хочу! ',
  //   web_app: { url: 'https://master--fancy-sorbet-314ca5.netlify.app/' },
  //   callback_data: 'givemenumber'
  // },