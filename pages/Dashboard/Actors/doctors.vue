<script lang="ts" setup>  
import { onMounted, ref } from 'vue';
import type { DoctorsModel } from '../../../models/DoctorsModel';
import validators from '../../../services/validators';
import { localhostAPI } from '../../../utils/localhostApi';

definePageMeta({  
  layout: false,  
});  

const headers = ref([  
  { title: 'Full Name', align: 'center', sortable: true, key: 'fullName' },  
  { title: 'Mobile Number', align: 'center', sortable: true, key: 'mobileNumber' },  
  { title: 'Created At', align: 'center', sortable: true, key: 'createdAt' },  
  { title: 'Updated At', align: 'center', sortable: true, key: 'updatedAt' },  
  { title: 'Image', align: 'right', sortable: true, key: 'image.image' },  
  { title: 'Actions', align: 'center', key: 'actions', sortable: false },  
] as const);  

const Loading = ref(true);  
const data = ref<{ 'result': DoctorsModel[] }>({ 'result': [] });  
onMounted(async () => {  
  Loading.value = true;  
  data.value = await localhostAPI.get<{ 'result': DoctorsModel[] }>('getDoctor');  
  Loading.value = false;  
});  

const loginForm = ref();  
const token = window?.localStorage.getItem('sessionToken');  
const userName = ref('');  
const fullName = ref('');  
const password = ref('');  
const birthdate_ms = ref('');  
const mobileNumber = ref('');  
const imageBase64 = ref('');  
const gender = ref('');   

const saveDoctor = () => {  
  createDoctor();  
};  

const snackbar = ref({ show: false, message: '', color: 'error' });  
const showSnackbar = (message: string, color = 'error') => {  
  snackbar.value.message = message;  
  snackbar.value.color = color;  
  snackbar.value.show = true;  
};  

const closeSnackbar = () => {  
  snackbar.value.show = false;  
}; 

const createDoctor = async () => {  
  if (loginForm.value.isValid) {
    try{
      Loading.value = true;   
      const requestBody = {  
        fullName: fullName.value,  
        username: userName.value,  
        birthdate_ms: birthdate_ms.value,  
        mobileNumber: mobileNumber.value,  
        password: password.value,  
        image_base64: imageBase64.value,  
        gender: gender.value,  
      };  
      await localhostAPI.post('crateDoctor', requestBody, token);
      showSnackbar('Doctor created successfully', 'success');   
      Loading.value = false;
    }
    catch(error){
      showSnackbar(error.message, 'error');
      Loading.value = false;
    }
  }  
};  

const handleImageUpload = (event: Event) => {  
  const file = (event.target as HTMLInputElement).files?.[0];  
  if (file) {  
    const reader = new FileReader();  
    reader.onload = () => {  
      imageBase64.value = reader.result as string;  
    };  
    reader.readAsDataURL(file);  
  }  
};  
</script>

<template>  
  <div>  
    <NuxtLayout  
      name="dashboard"  
      :headers="headers"  
      :data="data.result"  
      table-name="Doctors"  
      :loading="Loading"
      :disable="!loginForm?.isValid"  
      @save="saveDoctor"  
    >  
      <template #newItem>  
        <VForm  
          ref="loginForm"  
          validate-on="input"  
          @submit.prevent="createDoctor"  
        >  
          <VRow>  
            <VCol
              cols="12"
              md="6"
              sm="6"
            >  
              <VTextField  
                v-model="fullName" 
                :rules="[validators.rules.fullNameRule]"  
                label="Full Name"  
                focus-all  
                :length="4"  
                variant="outlined"  
              />  
            </VCol>  
            <VCol
              cols="12"
              md="6"
              sm="6"
            >  
              <VTextField  
                v-model="userName"  
                :rules="[validators.rules.userNameRule]" 
                label="Username"  
                focus-all  
                :length="4"  
                variant="outlined"  
              />  
            </VCol>  
            <VCol
              cols="12"
              md="6"
              sm="6"
            >  
              <VTextField  
                v-model="birthdate_ms"  
                :rules="[validators.rules.birthdateRule]" 
                label="Birth Date (in ms)"  
                focus-all  
                :length="4"  
                variant="outlined"  
              />
            </VCol>  
            <VCol
              cols="12"
              md="6"
              sm="6"
            >  
              <VTextField  
                v-model="mobileNumber" 
                :rules="[validators.rules.phoneNumberRule]" 
                label="Mobile Number"  
                focus-all  
                :length="4"  
                variant="outlined"  
              />  
            </VCol>  
            <VCol
              cols="12"
              md="6"
              sm="6"
            >  
              <VTextField  
                v-model="password"  
                :rules="[validators.rules.passwordRule]" 
                label="Password"  
                type="password"  
                focus-all  
                :length="4"  
                variant="outlined"  
              />  
            </VCol>  
            <VCol
              cols="12"
              md="6"
              sm="6"
            >  
              <VFileInput  
                clearable  
                label="Image"
                required
                variant="outlined"  
                @change="handleImageUpload"  
              />  
            </VCol>  
            <VCol
              cols="12"
              md="6"
              sm="6"
            >  
              <VRadioGroup  
                v-model="gender"
                :rules="[validators.rules.genderRule]"    
                inline  
                label="Gender"  
              >  
                <VRadio
                  label="Male"
                  value="male"
                />  
                <VRadio
                  label="Female"
                  value="female"
                />  
              </VRadioGroup>  
            </VCol>  
          </VRow>  
        </VForm>
      </template>  
      <VSnackbar
        v-model="snackbar.show"
        :color="snackbar.color"
      >  
        {{ snackbar.message }}  
        <template #action="{ attrs }">  
          <VBtn
            text
            v-bind="attrs"
            @click="closeSnackbar"
          >
            Close
          </VBtn>  
        </template>  
      </VSnackbar>  
    </NuxtLayout>  
  </div>  
</template>