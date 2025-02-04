<script setup lang="ts">
import { useLoginAdmin } from '@@/queries/admin';
import validators from '@@/utils/validators';
import { computed, ref } from 'vue';

definePageMeta({
  layout: false,
})


const adminForm = ref({
  username:'',
  password:'',
})
const loginAdminForm = ref()
const isLoading = ref(false);

const loginAdmin = async () => {
  isLoading.value = true;
  const { status,data } = await useLoginAdmin(adminForm.value)
  if (status.value == 'success') {
    isLoading.value = false
  }
}
const isValidForm = computed(() => loginAdminForm.value?.isValid)
</script>

<template>
  <div>
    <VWindow class="h-100">
      <AuthLoginWindowItem
        :step="1"
        title="Admin Login"
      >
        <template #form>
          <VForm
            ref="loginAdminForm"
            validate-on="input"
            @submit.prevent="loginAdmin"
          >
            <VRow>
              <VCol>
                <VTextField
                  v-model="adminForm.username"
                  :rules="[validators.rules.userNameRule]"
                  label="UserName"
                  variant="outlined"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <VTextField
                  v-model="adminForm.password"
                  :rules="[validators.rules.passwordRule]"
                  label="Password"
                  variant="outlined"
                  type="password"
                />
              </VCol>
            </VRow>

            <VBtn
              :disabled="!isValidForm"
              :loading="isLoading"
              type="submit"
              class="text-none mt-8"
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

  </div>
</template>
