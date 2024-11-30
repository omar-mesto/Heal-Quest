import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAdvertisementsStore = defineStore('advertisements', () => {  
  const advertisements = ref([]);  
  const error = ref(null);  
  const loading = ref(false);  

  const fetchAdvertisements = async () => {  
    loading.value = true;  
    error.value = null;  

    const url = 'https://hq.90-soft.com/api/functions/getAdvertisment';  
    const headers = {  
      'X-Parse-Application-Id': 'appId',
      'X-Parse-REST-API-Key': 'restAPIKey', 
      'Content-Type': 'application/json',  
    };  

    try {  
      const response = await fetch(url, { headers });  
      if (!response.ok) {  
        throw new Error('Network response was not ok');
      }  
      const data = await response.json();  

      if (Array.isArray(data.result)) {  
        advertisements.value = data.result;   
      } else {  
        throw new Error('Fetched data is not an array.');  
      }  
    } catch (err) {  
      error.value = err.message;  
    } finally {  
      loading.value = false;  
    }  
  };  

  return {  
    advertisements,  
    error,  
    loading,  
    fetchAdvertisements,  
  };  
});