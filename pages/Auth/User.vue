<script setup lang="ts">
import validators from '@@/utils/validators'
import { navigateTo } from 'nuxt/app'
import { ref } from 'vue'

import { api } from '../../utils/api'

definePageMeta({ layout: false })
const phone = ref('')
const otp = ref('')
const step = ref(1)
const loginForm = ref()
const snackbar = ref({ color: 'error', message: '', show: false })

const showSnackbar = (message: string, color = 'error') => {
  snackbar.value.message = message
  snackbar.value.color = color
  snackbar.value.show = true
}

const closeSnackbar = () => {
  snackbar.value.show = false
}

const generateOtp = async () => {
  if (loginForm.value.isValid) {
    try {
      await api.post('generateOTP', {
        mobileNumber: phone.value,
      })
      showSnackbar('OTP sent successfully', 'success')
      step.value++
    } catch (error) {
      showSnackbar(error.message, 'error')
    }
  }
}

const login = async () => {
  if (loginForm.value.isValid) {
    try {
      const data = await api.post('loginClient', {
        installationId: phone.value,
        mobileNumber: phone.value,
        otpCode: otp.value,
      })

      localStorage.setItem('sessionToken', data.result?.sessionToken)
      showSnackbar('Login successfully', 'success')
      navigateTo('/userProfile')
    } catch (error) {
      showSnackbar(error.message, 'error')
    }
  }
}
</script>

<template>
  <VCard>
    <VWindow
      v-model="step"
    >
      <AuthLoginWindowItem
        :step="1"
        title="Login"
        message="Enter Your Phone Number to Send OTP"
      >
        <template #form>
          <VForm
            ref="loginForm"
            validate-on="input"
            @submit.prevent="generateOtp"
          >
            <VTextField
              v-model="phone"
              :rules="[validators.rules.phoneNumberRule]"
              label="Phone Number"
              variant="outlined"
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
              Send OTP
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
      <AuthLoginWindowItem
        :step="2"
        title="Login"
        message="Enter the OTP that we sent"
      >
        <template #form>
          <VForm
            ref="otpForm"
            validate-on="input"
            @submit.prevent="login"
          >
            <VOtpInput
              v-model="otp"
              focus-all
              :length="4"
              variant="outlined"
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
            src="/public/OTPuser.png"
            class="mt-10"
            height="500px"
          />
        </template>
      </AuthLoginWindowItem>
    </VWindow>
    <VSnackbar
      v-model="snackbar.show"
      :color="snackbar.color"
    >
      {{ snackbar.message }}
      <template>
        <VBtn
          variant="text"
          @click="closeSnackbar"
        >
          Close
        </VBtn>
      </template>
    </VSnackbar>
  </VCard>
</template>
