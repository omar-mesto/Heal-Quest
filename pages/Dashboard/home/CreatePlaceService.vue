<script setup lang="ts">
import { useCreateCategory } from '@@/queries/categories'
import { useCreatePlaceService, usePlaces } from '@@/queries/plcaes'
import { useAllServices, useServices } from '@@/queries/services'
import validators from '@@/utils/validators'
import { computed, ref } from 'vue'
const emit = defineEmits(['close'])
const form = ref({
  place:'',
  service:'',
  description_ar:'',
  description_en:'',
  price:'',
})
const {data:places,status:placesStatus}=usePlaces()
const {data:service,status:servicesStatus}=useAllServices()
const isLoading=ref(false);
const createForm = ref()
const create = async () => {
  isLoading.value=true;
  const { status } = await useCreatePlaceService(form.value)

if (status.value == 'success'){
  emit('close')
}
if(status.value!=='success') {
    isLoading.value=false
  }
}


const isValidForm = computed(() => createForm.value?.isValid)
</script>

<template>
  <VContainer>
    <VForm
      ref="createForm"
      validate-on="input"
      @submit.prevent="create()"
    >
      <VCardText>
        <VRow>
    
    
          <VCol   cols="12"
            md="6"
            sm="6">
            <VSelect label="Place" density="comfortable" hide-details="auto" variant="outlined" :loading="placesStatus=='pending'" v-model="form.place" :items="places?.result" item-value="id" item-title="name.en" />
          </VCol>
          <VCol   cols="12"
            md="6"
            sm="6">
            <VSelect label="Service" density="comfortable" hide-details="auto" variant="outlined" :loading="placesStatus=='pending'" v-model="form.service" :items="service?.result" item-value="id" item-title="name.en" />
          </VCol>
          <VCol
            cols="12"
            md="6"
            sm="6"
          >
            <VTextField
              v-model="form.description_ar"
              :rules="[validators.rules.required]"
              label="Description arabic"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
            sm="6"
          >
            <VTextField
              v-model="form.description_en"
              :rules="[validators.rules.required]"
              label="Description english"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
            sm="6"
          >
            <VTextField
              v-model="form.price"
              :rules="[validators.rules.required]"
              label="Price"
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
