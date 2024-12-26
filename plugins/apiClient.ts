// plugins/api.js  
import { defineNuxtPlugin } from 'nuxt/app';

export default defineNuxtPlugin(() => {  
  const BASE_URL = 'https://hq.90-soft.com/api/functions';  
  const API_HEADERS = {  
    'X-Parse-Application-Id': 'appId',  
    'X-Parse-REST-API-Key': 'restAPIKey',  
    'Content-Type': 'application/json',  
  };  

  const api = $fetch.create({  
    baseURL: BASE_URL,  
    async onRequest({ options }) {  
      Object.entries(API_HEADERS).forEach(([key, value]) => {  
        options.headers.set(key, value);  
      });  
    },  
  });  

  return {  
    provide: {  
      api,  
    },  
  };  
});