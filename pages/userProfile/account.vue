<script lang="ts" setup>
import { useCreateDoctor } from '@@/queries/doctors'
import validators from '@@/utils/validators'
import { computed, ref } from 'vue'
definePageMeta({
  layout: 'user',
})

const userForm = ref({
  birthdate: null,
  image: '',
  password: '',
  phoneNumber: '',
  username: '',
})

const isLoading = ref(false)
const createDoctorForm = ref()

const addImageToUserForm = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file)
    return true
  const reader = new FileReader()

  reader.onload = () => {
    userForm.value.image = reader.result as string
  }

  reader.readAsDataURL(file)
}

const updateUserInfo = async () => {
  isLoading.value = true
  const { status } = await useCreateDoctor(userForm.value)
}
const isValidForm = computed(() => createDoctorForm.value?.isValid)
</script>

<template>
  <VContainer
    fluid
    class="fill-height pt-0"
  >
    <VRow
      justify="center"
    >
      <VCol cols="10" lg="7" sm="10">
        <VForm
          ref="createDoctorForm"
          validate-on="input"
          @submit.prevent="updateUserInfo()"
        >
          <VCard
            class="w-100 px-5"
          >
            <VCardSubtitle class="text-center">
              <VAvatar
                size="100"
                class="mb-5"
              >
                <VImg src="/default-image.png" />
              </VAvatar>
            </VCardSubtitle>
            <!-- <VRow>
              <VCol>
                <VTextField
                  v-model="userForm.fullName"
                  label="Full name"
                  :rules="[validators.rules.fullNameRule]"
                  variant="outlined"
                />
              </VCol>
            </VRow> -->
            <VRow>
              <VCol>
                <VTextField
                  v-model="userForm.username"
                  :rules="[validators.rules.userNameRule]"
                  label="User Name"
                  variant="outlined"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <VTextField
                  v-model="userForm.password"
                  :rules="[validators.rules.passwordRule]"
                  label="Password"
                  variant="outlined"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <VDateInput
                  v-model="userForm.birthdate"
                  label="Date Of Birth"
                  placeholder="DD / MM / YYYY"
                  required
                  prepend-icon=""
                  append-inner-icon="mdi-calendar"
                  variant="outlined"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <VFileInput
                  clearable
                  label="Profile image"
                  required
                  prepend-icon=""
                  append-inner-icon="mdi-cloud-upload-outline"
                  @change="addImageToUserForm"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <VCardActions class="d-flex justify-end">
                  <VBtn
                    variant="elevated"
                    color="primary"
                    class="text-none"
                    type="submit"
                    large
                    :loading="isLoading"
                    :disabled="!isValidForm"
                  >
                    Update
                  </VBtn>
                </VCardActions>
              </VCol>
            </VRow>
          </VCard>
        </VForm>
      </VCol>
    </VRow>
  </VContainer>
</template>
