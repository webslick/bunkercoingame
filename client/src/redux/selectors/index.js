 
export const app = {
  mobile: (state) => state.app.mobile,
  appInfo: (state) => state.app.appInfo,
  miningInfo: (state) => state.app.miningInfo,
  progress: (state) => state.app.progress,
  best_switch: (state) => state.app.best_switch,
  wait: (state) => state.app.wait,
  board: (state) => state.app.board,
  wait_count: (state) => state.app.wait_count,
}

export const pages = {
  page:(state) => state.pages.page, 
  active:(state) => state.pages.active,
}

export const footer = {
  hidden:(state) => state.footer.hidden, 
}
 
export const popup_looser = {
  popup_visible_looser:(state) => state.popup_looser.popup_visible_looser,  
}
 
export const popup_info = {
  popup_visible_info:(state) => state.popup_info.popup_visible_info, 
}
 
export const users = {
  user:(state) => state.users.user, 
  all_users:(state) => state.users.all_users, 
}
 
export const timer = {
  daily:(state) => state.timer.daily, 
  energy:(state) => state.timer.energy,   
}
 
export const loader = {
  loading:(state) => state.loader.loading,   
}
 