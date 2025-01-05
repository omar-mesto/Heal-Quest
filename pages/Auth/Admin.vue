<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import validators from '../../services/validators';
import { useAdminAuthStore } from '../../store/auth/admin';
const router = useRouter();
const success=ref()
definePageMeta({
  layout: false,
})

let adminAuthStore = useAdminAuthStore()
const loginForm = ref();

const login = async () => {
  if (loginForm.value.isValid) {
    adminAuthStore.setUserName(adminAuthStore.userName);
    adminAuthStore.setPassword(adminAuthStore.password);

    success.value = await adminAuthStore.loginAdmin();
  } 
  // if (success) {
  //   router.push('/dashboard');
  // }
};


</script>

<template>
  <div class="">
    <VWindow
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
              v-model="adminAuthStore.userName"
              :rules="[validators.rules.userNameRule]"
              label="UserName"
              variant="outlined"
            />
            <VTextField
              v-model="adminAuthStore.password"
              :rules="[validators.rules.passwordRule]"
              label="Password"
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
  </VWindow>
  <VSnackbar
      v-model="adminAuthStore.snackBar.show"
      :color="adminAuthStore.snackBar.color"
      @close="adminAuthStore.closeSnackbar"
    >
      {{ adminAuthStore.snackBar.message }}
      <template #actions>
        <VBtn
          color="white"
          vartain="text"
          @click="adminAuthStore.closeSnackbar"
        >
          Close
        </VBtn>
      </template>
    </VSnackbar>
  </div>
</template>