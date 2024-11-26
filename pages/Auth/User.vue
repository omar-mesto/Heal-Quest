<template>
  <v-card class="elevation-8 h-screen">
    <v-window v-model="step">
      <v-window-item :value="1">
        <v-row>
          <v-col cols="12" sm="12" md="6" class="d-flex h-screen justify-center align-center">
            <div class="w-75">
              <v-card-title class="text-center text-h4 font-weight-bold">
                Login
              </v-card-title>
              <v-card-text>
                <p class="text-center py-4">
                  Enter Your Phone Number to Send OTP
                </p>
                <v-form @submit.prevent="submit">
                  <v-text-field v-model="phone.value.value" placeholder="0962004602"
                    :error-messages="phone.errorMessage.value" color="primary" clearable label="phone number"
                    variant="outlined" />
                  <v-btn type="submit" class="text-none my-2" color="primary" size="x-large" variant="flat" block>
                    Signin
                  </v-btn>
                </v-form>
              </v-card-text>
            </div>
          </v-col>
          <v-col cols="0" sm="0" md="6" class="d-md-block d-none justify-center align-center bg-primary">
            <v-img src="/public/userLogin.png" class="mt-10" style="height: 80vh" />
            <div class="text-center py-5">
              <v-btn outlined icon="mdi-record" variant="outlined" />
              <v-btn variant="plain" icon="mdi-record" />
            </div>
          </v-col>
        </v-row>
      </v-window-item>
      <v-window-item :value="2">
        <v-row class="h-full">
          <v-col cols="0" sm="0" md="6" class="d-md-block d-none justify-center align-center bg-primary">
            <v-img src="/public/OTPuser.png" class="mt-10" style="height: 80vh" />
            <div class="text-center py-5">
              <v-btn variant="plain" icon="mdi-record" @click="step--" />
              <v-btn outlined icon="mdi-record" variant="outlined" />
            </div>
          </v-col>
          <v-col cols="12" sm="12" md="6" class="d-flex h-screen justify-center align-center">
            <div class="w-75">
              <v-card-title class="text-center font-weight-bold">
                Login
              </v-card-title>
              <v-card-text>
                <p class="text-center py-6">
                  Enter The OTP That We Sent
                  <span class="text-primary">0962004602</span>
                </p>
                <v-otp-input focus-all :length="4" variant="solo-filled" />
              </v-card-text>

              <v-card-actions>
                <v-btn class="text-none mb-4" color="primary" size="x-large" variant="flat" block>
                  Signin
                </v-btn>
              </v-card-actions>
            </div>
          </v-col>
        </v-row>
      </v-window-item>
    </v-window>
    <v-snackbar v-model="snackbarVisible" :timeout="3000" bottom right class="text-white" color="green-accent-4">
      {{ snackbarMessage }}
    </v-snackbar>
  </v-card>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { ref } from 'vue';
definePageMeta({
  layout: false,
});


const step = ref(1);
const snackbarVisible = ref(false);
const snackbarMessage = ref('');

const { handleSubmit } = useForm({
  validationSchema: {
    phone(value) {
      if (/^[0-9-]{10,}$/.test(value)) return true

      return 'Phone number needs to be at least 10 digits.'
    }
  },
})
const phone = useField('phone')

const submit = handleSubmit(values => {
  snackbarMessage.value = 'OTP has been sent successfully!';
  snackbarVisible.value = true;
  step.value++;
});  
</script>