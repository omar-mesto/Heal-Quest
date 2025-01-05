import { useFetch } from 'nuxt/app';
import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useAdminAuthStore = defineStore('admin', () => {
  const userName = ref('');    
  const password=ref('')
  const userNameError = ref('');  
  const snackBar = ref({  
    show: false,  
    message: '',  
    color: 'error',  
  });  
    
  const setUserName = (newUserName:string) => {  
    userName.value = newUserName;  
  };  

  const setUserNameError = (error:string) => {  
    showSnackBar(error);  
  }; 

  const setPassword = (newPassword:string) => {  
    password.value = newPassword;  
  };  

  const setPasswordError = (error:string) => {  
    showSnackBar(error);  
  };   

  const showSnackBar = (message:string, color = 'error') => {  
    snackBar.value.message = message;  
    snackBar.value.color = color;  
    snackBar.value.show = true;  
  };  

  const closeSnackbar = () => {  
    snackBar.value.show = false;  
  };  

  const loginAdmin = async () => {  
    const { data, error } = await useFetch('https://hq.90-soft.com/api/functions/logIn', {  
      method: 'POST',  
      headers: {  
        'X-Parse-Application-Id': 'appId',  
        'X-Parse-REST-API-Key': 'restAPIKey', 
      },  
      body: JSON.stringify({  
        username: userName.value,  
        password:password.value,
      }),  
    });  

    if (!error.value) {  
      const sessionToken = data.value.result.sessionToken;  
      localStorage.setItem('sessionToken', sessionToken);  
      showSnackBar('Login successfully', 'success');  
      
      return true;  
    } else {  
      // Handle error more accurately based on your API structure  
      const errorMessage = error.value?.data?.error || 'Login failed, please try again!';  
      showSnackBar(errorMessage); // Optional: can show snackbar here as well  
      showSnackBar(errorMessage, 'error'); // Show snackbar for error  
      
      return false;  
    }  
    
    return data.value;  
  };  

  return {  
    userName,  
    password,
    userNameError,
    snackBar,
    setUserName,  
    setUserNameError,  
    setPassword,
    setPasswordError,
    showSnackBar,  
    closeSnackbar,  
    loginAdmin,  
  };  
});