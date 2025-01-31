<script setup lang="ts">
import { useCreateCategory } from '@@/queries/categories'
import validators from '@@/utils/validators'
import { computed, ref } from 'vue'
const emit = defineEmits(['close'])
const categoryForm = ref({
  name_en:'',
  name_ar:'',
  icon:''
})
const createCategoryForm = ref()
const createDoctor = async () => {
  const { status } = await useCreateCategory(categoryForm.value)

if (status.value == 'success')
emit('close')
}

const addIconToCategoryForm = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file)
    return true
  const reader = new FileReader()

  reader.onload = () => {
    categoryForm.value.icon = reader.result as string
  }

  reader.readAsDataURL(file)
}
const isValidForm = computed(() => createCategoryForm.value?.isValid)
</script>

<template>
  <VContainer>
    <VForm
      ref="createCategoryForm"
      validate-on="input"
      @submit.prevent="createDoctor()"
    >
      <VCardText>
        <VRow>
          <VCol
            cols="12"
            md="6"
            sm="6"
          >
            <VTextField
              v-model="categoryForm.name_en"
              :rules="[validators.rules.fullNameRule]"
              label="English Name"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
            sm="6"
          >
            <VTextField
              v-model="categoryForm.name_ar"
              :rules="[validators.rules.userNameRule]"
              label="Arablic Name"
            />
          </VCol>
          <VCol
            cols="12"
            md="12"
            sm="6"
          >
            <VFileInput
              clearable
              label="Profile image"
              :rules="[validators.rules.imageRule]"
              prepend-icon=""
              append-inner-icon="mdi-cloud-upload-outline"
              @change="addIconToCategoryForm"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
            sm="6"
          >
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
          :disabled="!isValidForm"
        >
          Save
        </VBtn>
      </VCardActions>
    </VForm>
  </VContainer>
</template>
