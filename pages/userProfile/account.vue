<script lang="ts" setup>
import { ref } from 'vue';

definePageMeta({
  layout: 'user',
});

const fullName = ref('John Doe');
const phoneNumber = ref('+123 567 89000');
const dateOfBirth = ref('DD / MM / YYYY');
</script>

<template>
  <VCard
    class="pa-4"
    width="100%"
    max-width="500px"
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
        variant="outlined"
      />
      <VTextField
        v-model="phoneNumber"
        label="Phone Number"
        required
        variant="outlined"
      />
      <VTextField
        v-model="dateOfBirth"
        label="Date Of Birth"
        placeholder="DD / MM / YYYY"
        required
        variant="outlined"
      />
      <div class="text-center">
        <VBtn
          color="primary"
          type="submit"
          class="mt-4"
          large
        >
          Update Profile
        </VBtn>
      </div>
    </VForm>
  </VCard>
</template>
