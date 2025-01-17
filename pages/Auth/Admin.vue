<script setup lang="ts">  
import { navigateTo } from 'nuxt/app';
import { ref } from 'vue';
import validators from '../../services/validators';
import Snackbar from '../../shared/Snackbar.vue';
import { localhostAPI } from '../../utils/localhostApi';

definePageMeta({  
  layout: false,  
});  

const userName = ref('');  
const password = ref('');   
const loginForm = ref();  
const snackBar = ref({ show: false, message: '', color: 'error' });  

const showSnackBar = (message: string, color: string = 'error') => {  
  snackBar.value.message = message;  
  snackBar.value.color = color;  
  snackBar.value.show = true;  
};  
const closeSnackBar = () => {  
  snackBar.value.show = false;  
};  
const login = async () => {  
  if (loginForm.value.isValid) {  
    try {  
      const data = await localhostAPI.post('logIn', {  
        username: userName.value,  
        password: password.value,  
      });  
      localStorage.setItem('sessionToken', data.result?.sessionToken);  
      showSnackBar('Login successfully', 'success');  
      navigateTo('/dashboard');  
    } catch (error) {   
      showSnackBar(error.message);  
    }  
  }   
};  
</script>  

<template>  
  <div class="">  
    <VWindow class="h-100">  
      <AuthLoginWindowItem  
        :step="1"  
        title="Login"  
        message="Enter Your Phone Number to Send OTP"  
      >  
        <template #form>  
          <VForm              
            ref="loginForm"  
            validate-on="input"  
            @submit.prevent="login"  
          >  
            <VTextField  
              v-model="userName"  
              :rules="[validators.rules.userNameRule]"  
              label="UserName"  
              variant="outlined"  
            />  
            <VTextField  
              v-model="password"  
              :rules="[validators.rules.passwordRule]"  
              label="Password"  
              variant="outlined"  
              type="password"  
            />  
            <VBtn  
              :disabled="!loginForm?.isValid"  
              type="submit"  
              class="text-none my-2"  
              color="primary"  
              size="x-large"  
              variant="flat"  
              block  
            >  
              Sign In  
            </VBtn>  
          </VForm>  
        </template>  

        <template #image>  
          <VImg  
            src="/public/userLogin.png"  
            class="mt-10"  
            height="500px"  
          />  
        </template>  
      </AuthLoginWindowItem>  
    </VWindow>  

    <Snackbar   
      :show="snackBar.show"
      :message="snackBar.message"
      :color="snackBar.color" 
      @close="closeSnackBar"  
    />  
  </div>  
</template>