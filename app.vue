<script lang="ts" setup>

import { useAuthStore } from './store/auth/user';

const userAuthStore = useAuthStore()
useHead({
  title: 'Heal Quest',
})

</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
      
    <VSnackbar
      v-model="userAuthStore.snackbar.show"
      :color="userAuthStore.snackbar.color"
      @close="userAuthStore.closeSnackbar"
    >
      {{ userAuthStore.snackbar.message }}
      <template #actions>
        <VBtn
          color="white"
          vartain="text"
          @click="userAuthStore.closeSnackbar"
        >
          Close
        </VBtn>
      </template>
    </VSnackbar>
    </NuxtLayout>

  </div>
</template>
