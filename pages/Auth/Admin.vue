<script setup lang="ts">
import { useLoginAdmin } from '@@/queries/admin';
import { useGlobalStore } from "@@/stores/global";
import validators from '@@/utils/validators';
import { useRouter } from "nuxt/app";
import { computed, ref } from 'vue';

definePageMeta({
  layout: false,
})
const globalStore=useGlobalStore()

const adminForm = ref({
  username:'',
  password:'',
})
const loginAdminForm = ref()
const isLoading = ref(false);
const router = useRouter()

const loginAdmin = async () => {
  isLoading.value = true;
  const { status,data,error} = await useLoginAdmin(adminForm.value)
  if (status.value == 'success') {
    isLoading.value = false

    globalStore.role=data.value.result?.role
    globalStore.token=data.value.result?.sessionToken
    globalStore.currentUser={id:data.value.result.id,userName:data.value.result.userName}
    if(globalStore.role=='Doctor')
      await router.push({'name':'doctor'})
    else
      await router.push({'name':'Dashboard'})

  }else{
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
        title="Login"
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