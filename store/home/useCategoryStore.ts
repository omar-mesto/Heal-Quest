import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCategoryStore = defineStore('category', () => {  
  const categories = ref([]);  
  const error = ref(null);  
  const loading = ref(false);  

  
  const fetchCategories = async () => {  
    loading.value = true;
    error.value = null;

    const url = 'https://hq.90-soft.com/api/functions/getCategories';  
    const headers = {  
      'X-Parse-Application-Id': 'appId', 
      'X-Parse-REST-API-Key': 'restAPIKey',
      'Content-Type': 'application/json',  
    };  

    try {  
      const response = await fetch(url, { headers });  
      const data = await response.json();  
      if (Array.isArray(data.result)) {  
        categories.value = data.result; 
        console.log(categories)
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
    categories,  
    error,  
    loading,  
    fetchCategories,  
  };  
});