import ActionTypes from '../constants'; 

export function setLoadding(load) {
  return {
    type: ActionTypes.APP_LOADING,
    payload: load
  }
}
 