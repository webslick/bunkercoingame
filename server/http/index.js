const axios = require('axios');
const config = require('config');

const url_api = config.get('Server.URL.API'); 

const $api = axios.create({
  withCredentials: true,
  baseURL: url_api
});

 
$api.interceptors.request.use((config) => { 
  config.headers.token = `${config.token}`;
  return config;
})

module.exports = {
  main_api: $api, 
};