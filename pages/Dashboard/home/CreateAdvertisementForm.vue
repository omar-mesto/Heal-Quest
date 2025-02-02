<script setup lang="ts">
import { useCreateAdvertisment } from '@@/queries/advertisment'
import validators from '@@/utils/validators'
import { computed, ref } from 'vue'
const emit = defineEmits(['close'])
const advertismentsForm = ref({
  image:''
})
const isLoading=ref(false);
const createAdvertismentsForm = ref()
const createAdvertisments = async () => {
  isLoading.value=true;
  const { status } = await useCreateAdvertisment(advertismentsForm.value)

if (status.value == 'success')
emit('close')

if(status.value!=='success') {
    isLoading.value=false
  }
}

const addImageToAdvertismentsFormForm = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file)
    return true
  const reader = new FileReader()

  reader.onload = () => {
    advertismentsForm.value.image = reader.result as string
  }

  reader.readAsDataURL(file)
}

const isValidForm = computed(() => createAdvertismentsForm.value?.isValid)
</script>

<template>
  <VContainer>
    <VForm
      ref="createAdvertismentsForm"
      validate-on="input"
      @submit.prevent="createAdvertisments()"
    >
      <VCardText>
        <VRow>
          <VCol
            cols="12"
            md="12"
            sm="6"
          >
            <VFileInput
              clearable
              label="Advertisment Image"
              :rules="[validators.rules.imageRule]"
              prepend-icon=""
              append-inner-icon="mdi-cloud-upload-outline"
              @change="addImageToAdvertismentsFormForm"
            />
          </VCol>
        </VRow>
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn
          color="blue-darken-1"
          @click="$emit('close')"
        >
          Cancel
        </VBtn>
        <VBtn
          color="blue-darken-1"
          variant="elevated"
          type="submit"
          :loading="isLoading"
          :disabled="!isValidForm"
        >
          Save
        </VBtn>
      </VCardActions>
    </VForm>
  </VContainer>
</template>