<script lang="ts" setup>
import { useDoctors } from '@@/queries/doctors'
import { ref } from 'vue'
import CreateDoctorForm from './CreateDoctorForm.vue'

definePageMeta({layout:false})
const headers = ref([
  { align: 'center', key: 'fullName', sortable: true, title: 'Full Name' },
  { align: 'center', key: 'mobileNumber', sortable: true, title: 'Mobile Number' },
  { align: 'center', key: 'createdAt', sortable: true, title: 'Created At' },
  { align: 'center', key: 'updatedAt', sortable: true, title: 'Updated At' },
  { align: 'right', key: 'image.image', sortable: true, title: 'Image' },
  { align: 'center', key: 'actions', sortable: false, title: 'Actions' },
] as const)

const { data, status } = useDoctors()

const snackbar = ref({ color: 'error', message: '', show: false })



const closeSnackbar = () => {
  snackbar.value.show = false
}
const crateDoctorDialog=ref(false);

// useNuxtData("doctors")

</script>

<template>
  <div>
    <NuxtLayout
      name="dashboard"
      :headers="headers"
      :data="data?.result"
      table-name="Doctors"
      :loading="status!=='success'"
      dialogHeaderTitle="Create Doctor"
      @view-create-dialog="crateDoctorDialog=true"

    >
      <VSnackbar
        v-model="snackbar.show"
        :color="snackbar.color"
      >
        {{ snackbar.message }}
        <template >
          <VBtn
          variant="text"
            @click="closeSnackbar"
          >
            Close
          </VBtn>
        </template>
      </VSnackbar>

     
    </NuxtLayout>
    <PrimaryDialog v-model="crateDoctorDialog" title="Create Doctor" @close="crateDoctorDialog=false">
      <CreateDoctorForm @close="crateDoctorDialog=false"  />
    </PrimaryDialog>    
  </div>
</template>
