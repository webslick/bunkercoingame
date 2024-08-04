import axios from 'axios'; 
//  export const API_URL = 'https://inmemory-forever.com/api'; // RELEASE
export const API_URL = 'http://localhost:4000/api'; 
 
const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
}); 
 
const api =  {   
  main_api: $api 
}; 

export default api;
