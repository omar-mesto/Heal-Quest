<script setup lang="ts">

import {ref} from "vue";

const profile=ref({
  fullName:'ahmad',
  phoneNumber:'234567',
  dateOfBirth:'2002-01-01',
})
</script>

<template>

  <VContainer fluid class="fill-height">

    <VRow justify="center" align="center">
      <VCol cols="6">


  <VCard
 class="pa-5"
  >
    <VCardSubtitle class="text-center">
      <VAvatar
          size="100"
          class="mb-5"
      >
        <VImg src="/default-image.png" />
      </VAvatar>
    </VCardSubtitle>

    <VCardText>


<VRow>
  <VCol>

      <VTextField
          v-model="profile.fullName"
          label="Full name"
          variant="outlined"
      />
  </VCol>

</VRow>

      <VRow>

        <VCol>

      <VTextField
          v-model="profile.phoneNumber"
          label="Phone Number"
          required
          variant="outlined"
      />
        </VCol>

      </VRow>

      <VRow>
        <VCol>


      <VDateInput
          v-model="profile.dateOfBirth"
          label="Date Of Birth"
          placeholder="DD / MM / YYYY"
          required
          prepend-icon=""
          append-inner-icon="mdi-calendar"
          variant="outlined"
      />
        </VCol>
      </VRow>

    </VCardText>

    <VCardActions class="d-flex justify-end">
        <VBtn
            variant="elevated"
            color="primary"
            class="text-none"
            type="submit"
            large
        >
          Update
        </VBtn>
    </VCardActions>
  </VCard>
      </VCol>
    </VRow>
  </VContainer>

</template>