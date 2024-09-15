 import ActionTypes from '../constants'; 
import api from '../../http';  

export function set_user(user) {
  return {
    type: ActionTypes.USERS_PUT_USER,
    payload: user
  }
}

export function set_all_users(users) {
  return {
    type: ActionTypes.USERS_PUT_ALL_USER,
    payload: users
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
 
export async function getUserInfo (userId) { 
  try {  
    const response = await api.main_api.post('/getUserInfo', { userId })   
    const user = response.data;  
    return user
  } catch (error) {
    console.log(error.response?.data?.message)
    return error.response?.status;
  }
}
 
export async function createUser (newUser) {
  
  try { 
    const response = await api.main_api.post('/createUser', newUser) 
    const user = response.data;  
    return user
  } catch (error) {
    console.log(error.response?.data?.message)
    return error.response?.status;
  }
}
 
export async function getAllArrayIds (arrayIds) {
  
  try { 
    const response = await api.main_api.post('/getAllArrayIds', arrayIds)  
    const users = response.data;  
    return users
  } catch (error) {
    console.log(error.response?.data?.message)
    return error.response?.status;
  }
}
 
export async function set_info_user (user) { 
  try { 
    const response = await api.main_api.post('/setUserInfo', user)   
    const userg = response.data;  
    return userg 
  } catch (error) {
    console.log(error.response?.data?.message)
    return error.response?.status;
  }
}
 
export async function getAllUsers () {

  try {
    const response = await api.main_api.get('/getAllUsers')   
    const allUsers = response.data;  
    return allUsers
  } catch (error) {
    console.log(error.response?.data?.message)
    return error.response?.status;
  }
}
 
