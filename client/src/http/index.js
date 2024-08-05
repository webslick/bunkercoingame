import axios from 'axios'; 
  export const API_URL = 'https://bitbunkercoin.ru/api'; // RELEASE
//  export const API_URL = 'https://candid-granita-dc7078.netlify.app'; // RELEASE
// export const API_URL = 'http://localhost:4000/api'; 
 
const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
}); 
 
const api =  {   
  main_api: $api 
}; 

export default api;
