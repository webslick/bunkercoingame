 
const tg = window.Telegram.WebApp

// https://t.me/share/url?url={url}&text={text}
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