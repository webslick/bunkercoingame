import ActionTypes from '../constants';
import api from "../../http";  

export function setMobileMod(mode) {
  return {
    type: ActionTypes.APP_MOBILE,
    payload: mode
  }
}

export function change_page(page) { 
  return {
    type: ActionTypes.APP_PAGES_SCREEN,
    payload: page
  }
} 

export function visible_footer(visible) {  
  return {
    type: ActionTypes.FOOTER_HIDDEN,
    payload: visible
  }
} 

export function set_appinfo(app) {  
  return {
    type: ActionTypes.APP_INFO,
    payload: app
  }
} 

export function set_mininginfo(info) {  
  return {
    type: ActionTypes.APP_MINING_INFO,
    payload: info
  }
} 

export function set_progress(progress) {  
  return {
    type: ActionTypes.APP_PROGRESS,
    payload: progress
  }
} 

export function set_switch(switchs) {  
  return {
    type: ActionTypes.APP_SWITCH,
    payload: switchs
  }
} 

export function set_visibleLooser(visible) {  
  return {
    type: ActionTypes.POPUP_LOOSER_VISIBLE,
    payload: visible
  }
} 

export function set_wait(wait) {  
  return {
    type: ActionTypes.APP_WAIT,
    payload: wait
  }
} 

export function set_wait_count(wait) {  
  return {
    type: ActionTypes.APP_WAIT_COUNT,
    payload: wait
  }
} 
 
 
export async function putHistoryInfo(body) { 
  try {  
    const response = await api.main_api.post('/putHistoryInfo', body) 
    return response.data
  } catch (error) {
    console.log(error)
    return error.response?.status;
  }
}
 
export async function putBoardState(body) { 
  try {  
    const response = await api.main_api.post('/putBoardState', body) 
    return response.data
  } catch (error) {
    console.log(error)
    return error.response?.status;
  }
}
 
export async function putTotalCoin(body) { 
  try {  
    const response = await api.main_api.post('/putTotalCoin', body) 
    return response.data
  } catch (error) {
    console.log(error)
    return error.response?.status;
  }
}
 
export async function setPartners(body) { 
  try {  
    const response = await api.main_api.post('/setPartners', body) 
    return response.data
  } catch (error) {
    console.log(error)
    return error.response?.status;
  }
}

 
export async function getAppInfo () {

  try {
    const response = await api.main_api.get('/getAppInfo')  
    var app = {}
    if(response.status === 200) {   
      app = response.data;   
    } 
    return app;

  } catch (error) {
    console.log(error.response?.data?.message)
    return error.response?.status;
  }
}