<script setup lang="ts">
import { useCategories } from "@@/queries/categories";
import { useCreatePlace } from "@@/queries/plcaes";
import { useCreateService } from "@@/queries/services";
import validators from '@@/utils/validators';
import { computed, ref } from 'vue';
const emit = defineEmits(['close'])
const form = ref({
  name_en:'',
  name_ar:'',
})
const isLoading=ref(false);
const createServiceForm = ref()
const createService = async () => {

  isLoading.value=true;
  const { status } = await useCreateService(form.value)

  if (status.value === 'success')
    emit('close')

  isLoading.value=false;
}

const isValidForm = computed(() => createServiceForm.value?.isValid)
</script>

<template>
  <VContainer>
    <VForm
      ref="createServiceForm"
      validate-on="input"
      @submit.prevent="createService()"
    >
      <VCardText>
        <VRow>
          <VCol
            cols="12"
            md="6"
            sm="6"
          >
            <VTextField
              v-model="form.name_ar"
              :rules="[validators.rules.userNameRule]"
              label="Arabic name"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
            sm="6"
          >
            <VTextField
              v-model="form.name_en"
              :rules="[validators.rules.userNameRule]"
              label="English name"
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