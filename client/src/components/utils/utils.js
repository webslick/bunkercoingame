import Utf8 from 'crypto-js/enc-utf8';
import AES from 'crypto-js/aes';
import ECB from 'crypto-js/mode-ecb';
import Pkcs7 from 'crypto-js/pad-pkcs7';

export const CODE = {
  '0000': '',
  9999: '服务器内部异常',
  '0011': '参数不能为空',
  6110: '验证码已失效',
  6111: '验证失败',
  6112: '请刷新页面再试',
  6113: '请刷新页面再试',
  6201: '获取验证码次数超限',
  6206: '请刷新页面再试',
  6202: '接口验证失败数过多',
  6204: '验证请求次数超限',
};

function UUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function storage() {
  const uuid = UUID();
  const slider = 'slider' + '-' + uuid;
  const point = 'point' + '-' + uuid;
  // 判断下是否存在
  if (!localStorage.getItem('slider')) {
    localStorage.setItem('slider', slider);
  }
  if (!localStorage.getItem('point')) {
    localStorage.setItem('point', point);
  }
}

/**
 * @word 要加密的内容
 * @keyWord String  服务器随机返回的关键字
 *  */
export function aesEncrypt(word, keyWord = 'awKsGlMcdPMEhR1B') {
  const key = Utf8.parse(keyWord);
  const srcs = Utf8.parse(word);
  const encrypted = AES.encrypt(srcs, key, {
    mode: ECB,
    padding: Pkcs7,
  });
  return encrypted.toString();
}


/**
 * 加密滑动验证二次校验参数
 * @param preview
 * @param moveLeftDistance
 * @returns {{captchaVerification: string}}
 */
export function slideSecond(preview, moveLeftDistance) {
  let captchaVerification = `${preview.token}---${JSON.stringify({
    x: moveLeftDistance,
    y: 5.0,
  })}`;
  if (preview.secretKey) {
    captchaVerification = aesEncrypt(captchaVerification, preview.secretKey);
  }
  return { captchaVerification };
}

export function toImg(base64) {
  return `data:image/png;base64,${base64}`;
}

export function stop(e){
  if(e && e.preventDefault){ 
    e.preventDefault()
  }
}
