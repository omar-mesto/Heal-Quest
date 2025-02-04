<script lang="ts" setup>
import { ref } from 'vue';
definePageMeta({
  layout: 'user',
})
const fullName = ref('John Doe')
const phoneNumber = ref('+123 567 89000')
const dateOfBirth = ref('DD / MM / YYYY')

</script>

<template>
  <VContainer
    class="w-100"
    fluid
  >
    <VCard
      class="pa-4 mx-auto"
      max-width="500"
    >
      <VCardSubtitle class="text-center">
        <VAvatar
          size="100"
          class="mb-5"
        >
          <VImg src="/default-image.png" />
        </VAvatar>
      </VCardSubtitle>

      <VForm>
        <VTextField
          v-model="fullName"
          label="Full Name"
          required
          :rules="[(v:string) => !!v || 'Full name is required']"
        />
        <VTextField
          v-model="phoneNumber"
          label="Phone Number"
          required
          :rules="[(v:string) => !!v || 'Phone number is required']"
        />

        <VTextField
          v-model="dateOfBirth"
          label="Date Of Birth"
          placeholder="DD / MM / YYYY"
          required
          :rules="[(v:Date) => !!v || 'Date of birth is required']"
        />
        <div class="text-center" />
        <VBtn
          color="primary"
          type="submit"
          class="mt-4"
          large
        >
          Update Profile
        </VBtn>
      </VForm>
    </VCard>
  </VContainer>
</template>

<style scoped>
</style>
