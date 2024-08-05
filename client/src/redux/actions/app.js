import ActionTypes from '../constants';
 
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
 