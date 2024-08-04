import axios from 'axios'; 
import ActionTypes from '../constants';
import { API_URL } from '../../http'; 
import moment from 'moment';   
 
 

export function set_user(user) {
  return {
    type: ActionTypes.USERS_PUT_USER,
    payload: user
  }
}
 
 
export function change_visible_popup(visible) {
  return {
    type: ActionTypes.POPUP_LOGIN_VISIBLE,
    payload: visible
  }
}
 
export function change_visible_popover(visible) {
  return {
    type: ActionTypes.HEADER_POPOVER,
    payload: visible
  }
}
 
export function change_visible_referal_popup(visible) {
  return {
    type: ActionTypes.POPUP_REFERAL_VISIBLE,
    payload: visible
  }
}

export function set_enter_popup(enter) {
  return {
    type: ActionTypes.POPUP_LOGIN_ENTER,
    payload: enter
  }
}
  
export const convertSeconds = (time) => {
  const milliseconds = time%1000;
  const seconds     = parseInt(time=time/1000)%60;
  const minutes     = parseInt(time=time/60)%60;
  const hours       = parseInt(time=time/60)%24;
  const days        =  parseInt(time=time/24);
  return {
    seconds,
    minutes,
    hours,
    days,
  }
}

export const differentsTimeOff = (now,last) => {
  return convertSeconds(moment(last).diff(now));
}

export const convertTimeBd = (time) => {
  return moment(time).subtract(7,'hours').format("YYYY-MM-DD HH:mm");
}
 

export async function getMe (dispatch) { 
    try { 
      const response = await axios.get(`${API_URL}/user/me`, { withCredentials:true });  
      return response.data
    } catch (error) {
      console.log(error.response?.data?.message)
      return error.response?.status;
    }  
} 
 
export async function getUserInfo (dispatch) {

  try {
    const response = await axios.get(`${API_URL}/getUserInfo`, { withCredentials:true });
    console.log(response)
    const user = response.data; 
 
    return user
  } catch (error) {
    console.log(error.response?.data?.message)
    return error.response?.status;
  }
}
 
