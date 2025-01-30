<script setup lang="ts">
import { useCreateDoctor } from '@@/queries/doctors'
import validators from '@@/utils/validators'
import { computed, ref } from 'vue'
const emit = defineEmits(['close'])
const doctorForm = ref({
  birthdate: null,
  fullName: '',
  gender: '',
  image_base64: '',
  mobileNumber: '',
  password: '',
  username: '',
})
const createDoctorForm = ref()
const createDoctor = async () => {
  const { status } = await useCreateDoctor(doctorForm.value)

if (status.value == 'success')
emit('close')
}

const addImageToDoctorForm = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file)
    return true
  const reader = new FileReader()

  reader.onload = () => {
    doctorForm.value.image_base64 = reader.result as string
  }

  reader.readAsDataURL(file)
}
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
              v-model="doctorForm.fullName"
              :rules="[validators.rules.fullNameRule]"
              label="Full name"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
            sm="6"
          >
            <VTextField
              v-model="doctorForm.username"
              :rules="[validators.rules.userNameRule]"
              label="User name"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
            sm="6"
          >
            <VDateInput
              v-model="doctorForm.birthdate"
              label="Birth date"
              append-inner-icon="mdi-calendar"
              prepend-icon=""
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
            sm="6"
          >
            <VTextField
              v-model="doctorForm.mobileNumber"
              :rules="[validators.rules.phoneNumberRule]"
              label="Mobile number"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
            sm="6"
          >
            <VTextField
              v-model="doctorForm.password"
              :rules="[validators.rules.passwordRule]"
              label="Password"
              type="password"
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
              @change="addImageToDoctorForm"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
            sm="6"
          >
            <VRadioGroup

              v-model="doctorForm.gender"
              :rules="[validators.rules.genderRule]"
              inline
              color="primary"
            >
              <VRadio
                label="Male"
                value="male"
              />
              <VRadio
                label="Female"
                value="female"
              />
            </VRadioGroup>
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
