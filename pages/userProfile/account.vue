<script lang="ts" setup>
import { ref } from 'vue';

definePageMeta({
  layout: 'user',
});

const fullName = ref('John Doe');
const phoneNumber = ref('+123 567 89000');
const dateOfBirth = null  ;
</script>

<template>
    <VSheet
    class="w-100 pa-5"
    :class="[$vuetify.display.mobile?'w-100':'w-50']"
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
          class="py-3"
          label="Full Name"
          required
          variant="outlined"
        />
        <VTextField
          v-model="phoneNumber"
          label="Phone Number"
          class="py-3"
          required
          variant="outlined"
        />
        <VDateInput
                v-model="dateOfBirth"
                class="py-3"
                label="Birth date"
                append-inner-icon="mdi-calendar"
                prepend-icon=""
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
    </VSheet>
</template>
