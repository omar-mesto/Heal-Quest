<script lang="ts" setup>
import { ref } from 'vue'

import { useCreateDoctor, useDoctors } from '../../../queries/doctors'
import validators from '../../../utils/validators'
definePageMeta({
  layout: false,
})

const headers = ref([
  { align: 'center', key: 'fullName', sortable: true, title: 'Full Name' },
  { align: 'center', key: 'mobileNumber', sortable: true, title: 'Mobile Number' },
  { align: 'center', key: 'createdAt', sortable: true, title: 'Created At' },
  { align: 'center', key: 'updatedAt', sortable: true, title: 'Updated At' },
  { align: 'right', key: 'image.image', sortable: true, title: 'Image' },
  { align: 'center', key: 'actions', sortable: false, title: 'Actions' },
] as const)

const { data, status } = useDoctors()

const doctorForm = ref({
  birthdate: null,
  fullName: '',
  gender: '',
  imageBase64: '',
  mobileNumber: '',
  password: '',
  userName: '',
})
const createDoctorForm = ref()

const snackbar = ref({ color: 'error', message: '', show: false })

const showSnackbar = (message: string, color = 'error') => {
  snackbar.value.message = message
  snackbar.value.color = color
  snackbar.value.show = true
}

const closeSnackbar = () => {
  snackbar.value.show = false
}

const createDoctor = async () => {
  const { error } = useCreateDoctor(doctorForm.value)
  showSnackbar(error ?
    error.value?.data?.error
: 'Doctor created successfully',
  error ? 'error' : 'success',
  )
}

const addImageToDoctorForm = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file)
    return true
  const reader = new FileReader()

  reader.onload = () => {
    doctorForm.value.imageBase64 = reader.result as string
  }

  reader.readAsDataURL(file)
}
</script>

<template>
  <div>
    <NuxtLayout
      name="dashboard"
      :headers="headers"

      :data="data?.result"
      table-name="Doctors"
      :loading="status!=='success'"
      :disable="!createDoctorForm?.isValid"
      @save="createDoctor"
    >
      <template #newItem>
        <VForm
          ref="createDoctorForm"
          validate-on="input"
          @submit.prevent="createDoctor"
        >
          <VRow>
            <VCol
              cols="12"
              md="6"
              sm="6"
            >
              <VTextField
                v-model="doctorForm.fullName"
                :rules="[validators.rules.fullNameRule]"
                label="Full Name"
                focus-all
                :length="4"
                variant="outlined"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
              sm="6"
            >
              <VTextField
                v-model="doctorForm.userName"
                :rules="[validators.rules.userNameRule]"
                label="Username"
                focus-all
                :length="4"
                variant="outlined"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
              sm="6"
            >
              <VDateInput
                v-model="doctorForm.birthdate"
                label="Birth Date (in ms)"
                variant="outlined"
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
                label="Mobile Number"
                focus-all
                :length="4"
                variant="outlined"
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
                focus-all
                :length="4"
                variant="outlined"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
              sm="6"
            >
              <VFileInput
                clearable
                label="Image"
                required
                variant="outlined"
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
                label="Gender"
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
        </VForm>
      </template>
      <VSnackbar
        v-model="snackbar.show"
        :color="snackbar.color"
      >
        {{ snackbar.message }}
        <template #action="{ attrs }">
          <VBtn
            text
            v-bind="attrs"
            @click="closeSnackbar"
          >
            Close
          </VBtn>
        </template>
      </VSnackbar>
    </NuxtLayout>
  </div>
</template>
