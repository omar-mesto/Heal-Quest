<script setup lang="ts">
import { useCreateDoctor } from '@@/queries/doctors'
import validators from '@@/utils/validators'
import { computed, ref } from 'vue'
const emit = defineEmits(['close'])
const placeForm = ref({
  adress: '',
  name_en:'',
  name_ar:'',
  placeContact:'',
  images:[]
})
const isLoading=ref(false);
const createDoctorForm = ref()
const createDoctor = async () => {
  isLoading.value=true;
  const { status } = await useCreateDoctor(placeForm.value)

  if (status.value === 'success'){
  emit('close')
  }
}

const addImagesToPlaceForm = (event: Event) => {  
  const files = (event.target as HTMLInputElement).files;   
  placeForm.value.images = [];  

  const reader = new FileReader();  
  for (let i = 0; i < files.length; i++) {  
    const file = files[i];  
    reader.onload = (loadEvent: ProgressEvent<FileReader>) => { 
      placeForm.value.images.push({ data: loadEvent.target?.result as string });  
    };  
    reader.readAsDataURL(file);  
  }  
};  

const isValidForm = computed(() => createDoctorForm.value?.isValid)
</script>

<template>
  <VContainer>
    <VForm
      ref="createDoctorForm"
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
              v-model="placeForm.name_ar"
              :rules="[validators.rules.userNameRule]"
              label="Full name"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
            sm="6"
          >
            <VTextField
              v-model="placeForm.name_en"
              :rules="[validators.rules.userNameRule]"
              label="User name"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
            sm="6"
          >
          <VTextField
              v-model="placeForm.adress"
              :rules="[validators.rules.userNameRule]"
              label="User name"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
            sm="6"
          >
            <VFileInput
              clearable
              label="Profile image"
              required
              prepend-icon=""
              append-inner-icon="mdi-cloud-upload-outline"
              @change="addImagesToPlaceForm"
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
