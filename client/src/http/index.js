import axios from 'axios';  
export const API_URL = process.env.NODE_ENV == 'development' ? 'http://localhost:4000/api' : 'https://bitbunkercoin.ru/api'; 
 
const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
}); 
 
const api =  {   
  main_api: $api 
}; 

export default api;
