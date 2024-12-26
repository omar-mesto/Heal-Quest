import { useFetch } from 'nuxt/app';
import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useAuthStore = defineStore('auth', () => {
  const phone = ref('');  
  const otp = ref('');  
  const step = ref(1);  
  const phoneError = ref('');  
  const snackbar = ref({  
    show: false,  
    message: '',  
    color: 'error',  
  });  
    
  const setPhone = (newPhone:string) => {  
    phone.value = newPhone;  
  };  

  const setPhoneError = (error:string) => {  
    showSnackbar(error);  
  };  

  const setOtp = (newOtp:string) => {  
    otp.value = newOtp;  
  };  

  const setStep = (newStep:number) => {  
    step.value = newStep;  
  };  

  const showSnackbar = (message:string, color = 'error') => {  
    snackbar.value.message = message;  
    snackbar.value.color = color;  
    snackbar.value.show = true;  
  };  

  const closeSnackbar = () => {  
    snackbar.value.show = false;  
  };  

  const generateOtp = async () => {  
    const { data, error } = await useFetch('https://hq.90-soft.com/api/functions/generateOTP', {  
      method: 'POST',  
      headers: {  
        'X-Parse-Application-Id': 'appId',  
        'X-Parse-REST-API-Key': 'restAPIKey',  
        'Content-Type': 'application/json',  
      },  
      body: JSON.stringify({  
        mobileNumber: phone.value,  
      }),  
    });  

    if (!error.value) {  
      setStep(2);  
      showSnackbar('OTP sent successfully', 'success');  
    } else {  
      showSnackbar(error.value.data.error, 'error');  
    }    
    
    return data.value;  
  };  

  const login = async () => {  
    const { data, error } = await useFetch('https://hq.90-soft.com/api/functions/loginClient', {
      method: 'POST',
      headers: {
        'X-Parse-Application-Id': 'appId',
        'X-Parse-REST-API-Key': 'restAPIKey',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mobileNumber: phone.value,
        otpCode: otp.value,
        installationId: phone.value,
      }),
    });
      
    if (!error.value) {
      const  sessionToken  = data.value.result.sessionToken;
      localStorage.setItem('sessionToken', sessionToken);
      showSnackbar('Login successfully', 'success');
      
      return true;
    } else {
      setPhoneError(error.value.data.error);
      
      return false;
    }
  };  
  
  return {  
    phone,  
    otp,  
    step,  
    phoneError,  
    snackbar,  
    setPhone,  
    setOtp,  
    setStep,  
    showSnackbar,  
    closeSnackbar,  
    generateOtp,  
    login,  
  };  
});