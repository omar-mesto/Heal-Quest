<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import validators from '../../services/validators';
import { useAuthStore } from '../../store/auth/user';
const router = useRouter();

definePageMeta({
  layout: false,
})

const userAuthStore = useAuthStore()
const loginForm = ref();

const login = async () => {
  if (loginForm.value.isValid) {
      userAuthStore.setPhone(userAuthStore.phone);
      await userAuthStore.generateOtp();
  } else {
      userAuthStore.showSnackbar('Please enter a valid phone number.', 'warning');
  }
};

const checkOTP = async () => {
  userAuthStore.setOtp(userAuthStore.otp);
  const success = await userAuthStore.login();

  if (success) {
    router.push('/userProfile');
  }
};

</script>

<template>
  <VCard class="h-screen">
    <VWindow
      v-model="userAuthStore.step"
      class="h-100"
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
            @submit.prevent="login"
          >
            <VTextField
              v-model="userAuthStore.phone"
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

      <AuthLoginWindowItem
        :step="2"
        title="Login"
        message="Enter the OTP that we sent"
      >
        <template #form>
          <VForm
                ref="loginForm"
                validate-on="input"
                @submit.prevent="checkOTP"
            >
            <VOtpInput
              v-model="userAuthStore.otp"
              focus-all
              :length="4"
              variant="outlined"
            />
            <VBtn
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
  </VCard>
</template>