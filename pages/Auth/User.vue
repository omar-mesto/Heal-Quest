<script setup lang="ts">
import { useGenerateOtpUser, useLoginUser } from '@@/queries/users';
import { useGlobalStore } from "@@/stores/global";
import validators from '@@/utils/validators';
import { computed, ref } from 'vue';


definePageMeta({
  layout: false,
})

const step = ref<number>(1)

const globalStore=useGlobalStore()
const router = useRouter()

const userGenerateOtpForm = ref({
  mobileNumber: '',
})


const userLoginForm = ref({
  mobileNumber: '',
  installationId: '',
  otpCode: ''
})
const loginUserForm = ref()

const generateUserOtp = ref()
const isLoading = ref<boolean>(false)
const loginIsLoading=ref<boolean>(false)

const isValidGenrateOtpForm = computed(() => generateUserOtp.value?.isValid)

const generateOtp = async () => {
    isLoading.value = true
    const { status } = await useGenerateOtpUser(userGenerateOtpForm.value)
    if (status.value === 'success') {
      isLoading.value=false;
      step.value++
    }
  
}

const login = async () => {
  loginIsLoading.value = true
  
  userLoginForm.value.mobileNumber =  userGenerateOtpForm.value.mobileNumber
  userLoginForm.value.installationId= userGenerateOtpForm.value.mobileNumber
    const { status,data } = await useLoginUser(userLoginForm.value)
    if (status.value === 'success') {
      loginIsLoading.value = false
      globalStore.role=data.value.result?.role
      globalStore.token=data.value.result?.sessionToken
      globalStore.currentUser={id:data.value.result.id,userName:data.value.result.userName}
      await router.push({'path':'/userProfile/account'})
    }else{
    isLoading.value = false
  }
}
</script>

<template>
  <VCard>
    <VWindow v-model="step">
      <AuthLoginWindowItem
        :step="1"
        title="Login"
        message="Enter Your Phone Number to Send OTP"
      >
        <template #form>
          <VForm
            ref="generateUserOtp"
            validate-on="input"
            @submit.prevent="generateOtp"
          >
            <VTextField
              v-model="userGenerateOtpForm.mobileNumber"
              :rules="[validators.rules.phoneNumberRule]"
              label="Phone Number"
              variant="outlined"
            />
            <VBtn
              :disabled="!isValidGenrateOtpForm"
              :loading="isLoading"
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
          <VImg src="/public/userLogin.png" class="mt-10" height="500px" />
        </template>
      </AuthLoginWindowItem>
      <AuthLoginWindowItem
        :step="2"
        title="Login"
        message="Enter the OTP that we sent"
      >
        <template #form>
          <VForm
            ref="loginUserForm"
            validate-on="input"
            @submit.prevent="login"
          >
            <VOtpInput
              v-model="userLoginForm.otpCode"
              focus-all
              :length="4"
              variant="outlined"
            />
            <VBtn
              :loading="loginIsLoading"
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
          <VImg src="/public/OTPuser.png" class="mt-10" height="500px" />
        </template>
      </AuthLoginWindowItem>
    </VWindow>
  </VCard>
</template>
