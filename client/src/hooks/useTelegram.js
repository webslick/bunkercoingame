 
const tg = window.Telegram.WebApp
 
// import { useEffect } from "react";
// import WebApp from "@twa-dev/sdk";
// var backButton = WebApp.BackButton;
// var isButtonShown = false;
// export var BackButton = function (_a) {
//     var _b = _a.onClick, onClick = _b === void 0 ? function () {
//         window.history.back();
//     } : _b;
//     useEffect(function () {
//         backButton.show();
//         isButtonShown = true;
//         return function () {
//             isButtonShown = false;
//             // Мы ждем 10мс на случай, если на следующем экране тоже нужен BackButton.
//             // Если через это время isButtonShown не стал true, значит следующему экрану кнопка не нужна и мы её прячем
//             setTimeout(function () {
//                 if (!isButtonShown) {
//                     backButton.hide();
//                 }
//             }, 10);
//         };
//     }, []);
//     useEffect(function () {
//         WebApp.onEvent("backButtonClicked", onClick);
//         return function () {
//             WebApp.offEvent("backButtonClicked", onClick);
//         };
//     }, [onClick]);
//     return null;
// };





const useTelegram = url => {
 
  const onClose = () => {
    tg.close();
  }
 
  const openTelegramLink = (url) => {
    tg.openTelegramLink(url)
  }

  const onToggleButton = () => {
    if(tg.MainButton.isVisible) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show(); 
    }
  }
  
  return {
    onClose,
    onToggleButton,
    tg,
    usertg: tg.initDataUnsafe?.user,
    queryId: tg.initDataUnsafe?.query_id, 
    openTelegramLink
  }

};

export default useTelegram;