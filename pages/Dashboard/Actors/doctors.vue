<script lang="ts" setup>
import { DoctorsModel } from '@@/models/doctorsModel'
import { useDeleteDoctor, useDoctors } from '@@/queries/doctors'
import { computed, onMounted, ref } from 'vue'
import CreateDoctorForm from './CreateDoctorForm.vue'

definePageMeta({layout:false})
const headers = ref([
  { align: 'center', key: 'fullName', sortable: true, title: 'Full Name' },
  { align: 'center', key: 'userName', sortable: true, title: 'User Name' },
  { align: 'center', key: 'mobileNumber', sortable: true, title: 'Mobile Number' },
  { align: 'center', key: 'birthdate', sortable: true, title: 'Birth Date' },
  { align: 'center', key: 'createdAt', sortable: true, title: 'Joined At' },
  { align: 'right', key: 'image.image', sortable: true, title: 'Image' },
  { align: 'center', key: 'actions', sortable: false, title: 'Actions' },
] as const)

const page=ref(0)
const skip = ref(0)
const limit = ref(2)
const { data, status,clear,refresh } = useDoctors({ skip: skip, limit: limit });
clear()

onMounted(()=>{
  if(!data.value)
  refresh()
})
const crateDoctorDialog=ref(false);

const thisDoctor=ref<DoctorsModel>({id:'',fullName:'',mobileNumber:'',image:{image:''},userBlock:{status:false},name:{ar:'',en:''},createdAt:''})

const isLoading=ref(false);
const deleteDialog = ref(false)
const deleteDoctor = async (doctor:DoctorsModel)=>{
  isLoading.value=true;
  const { status } = await useDeleteDoctor(doctor.id)
  if(status.value =='success' ){
    deleteDialog.value=false
  }
  isLoading.value=false
}


const nextPage = (currentPage:number) => skip.value=currentPage;
const doctors=computed(()=>data.value?.result?.results)
</script>

<template>
  <div >
    <NuxtLayout
    v-if="doctors"
      name="dashboard"
      :headers="headers"
      :data="doctors"
      table-name="Doctors"
      :loading="status!=='success'"
      dialogHeaderTitle="Create Doctor"
      @view-create-dialog="crateDoctorDialog=true"
      @deleteThisItem="(item)=>{thisDoctor=item; deleteDialog=true;}"
    >
    <template #pagination>
      <VPagination

      @update:model-value="(e)=>nextPage(e)"
        v-model="page"
        :length="data?.result?.count /limit"
      />
    </template>
    </NuxtLayout>
    
    <PrimaryDialog v-model="crateDoctorDialog" title="Create Doctor" @close="crateDoctorDialog=false">
      <CreateDoctorForm @close="crateDoctorDialog=false"/>
    </PrimaryDialog>
    
    <PrimaryDialog icon="mdi-account-cancel-outline" @close="deleteDialog=false" v-model="deleteDialog" title="Delete">
      <VForm>
        <p class="text-h6">Are you sure, you want to delete <span class="font-weight-bold"> {{ thisDoctor.fullName }}</span> doctor </p>
        <VCardActions class="mt-4">
          <VSpacer></VSpacer>
          <VBtn
            color="grey-darken-3"
            @click="deleteDialog=false"
          >
            Cancel
          </VBtn>
          <VBtn
            elevation="0"
            color="error"
            variant="elevated"
            :loading="isLoading"
            :disabled="isLoading"
            @click="deleteDoctor(thisDoctor)" 
         
          >
            Save
          </VBtn>
        </VCardActions>
      </VForm>
    </PrimaryDialog>
  </div>
</template>