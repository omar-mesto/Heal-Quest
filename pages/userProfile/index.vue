<template>
    <v-container class="w-100" fluid>  
      <v-card class="pa-4 mx-auto" max-width="500">  
        <v-card-subtitle class="text-center">  
          <v-avatar size="100" class="mb-5">  
            <v-img src="../../public/userImage.png"/>  
          </v-avatar>  
        </v-card-subtitle>  

        <v-form>  
          <v-text-field  
            v-model="fullName"  
            label="Full Name"  
            required  
            :rules="[(v:string) => !!v || 'Full name is required']"  
          />  
          <v-text-field  
            v-model="phoneNumber"  
            label="Phone Number"  
            required  
            :rules="[(v:string) => !!v || 'Phone number is required']"  
          />  
          
          <v-text-field  
            v-model="dateOfBirth"  
            label="Date Of Birth"  
            placeholder="DD / MM / YYYY"  
            required  
            :rules="[(v:Date) => !!v || 'Date of birth is required']"  
          />  
          <div class="text-center"></div>
          <v-btn color="primary" type="submit" class="mt-4" large>Update Profile</v-btn>  
        </v-form>  
      </v-card>  
  </v-container>
</template>

<script lang="ts" setup>  
import { ref } from 'vue';
definePageMeta({
  layout: 'user'
})
const fullName = ref('John Doe');  
const phoneNumber = ref('+123 567 89000');   
const dateOfBirth = ref('DD / MM / YYYY');  

</script>  

<style scoped>  
</style>  