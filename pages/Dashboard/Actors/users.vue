<script lang="ts" setup>
import { UsersModel } from '@@/models/usersModel'
import { useBlockUser, useUsers } from '@@/queries/users'
import { onMounted, ref } from 'vue'

definePageMeta({layout:false})
const headers = ref([
  { align: 'center', key: 'id', sortable: true, title: 'id' },
  { align: 'center', key: 'userName', sortable: true, title: 'User Name' },
  { align: 'center', key: 'email', sortable: true, title: 'Email' },
  { align: 'center', key: 'mobileNumber', sortable: true, title: 'Mobile Number' },
  { align: 'center', key: 'createdAt', sortable: true, title: 'Joined At' },
  { align: 'right', key: 'image.image', sortable: true, title: 'Image' },
  { align: 'center', key: 'userBlock.status', sortable: true, title: 'User Block' },
  { align: 'center', key: 'actions', sortable: false, title: 'Actions' },
] as const)

const page=ref(0)
const skip = ref(0)
const limit = ref(3)

const { data, status,clear,refresh} = useUsers({ skip: skip, limit: limit });
clear()
onMounted(()=>{
  if(!data.value)
    refresh()
})

const thisUser=ref<UsersModel>({id:'',email:'',fullName:'',mobileNumber:'',image:{image:''},userBlock:{status:false},name:{ar:'',en:''},createdAt:''})

const isLoading=ref(false);
const deleteDialog = ref(false)
const deleteDoctor = async (doctor:UsersModel)=>{
  isLoading.value=true;
  const { status } = await useBlockUser(doctor.id)
  if(status.value =='success' ){
    deleteDialog.value=false
    isLoading.value=false
  }
}

const nextPage = (currentPage: number) => {
  if (currentPage > page.value) {
    skip.value = page.value;
    page.value++;
  }
  else {
    skip.value = limit.value;
    page.value++;
  }
}
</script>

<template>
  <div >
    <NuxtLayout
    v-if="data?.result?.results?.length"
      name="dashboard"
      :headers="headers"
      :data="data?.result?.results"
      table-name="Users"
      icon="mdi-account-cancel-outline"
      :loading="status!=='success'"
      usersPage:false
      @deleteThisItem="(item)=>{thisUser=item; deleteDialog=true;}"
    >
    <template #pagination>
      <VPagination

      @update:model-value="(e)=>nextPage(e)"
        v-model="page"
        :length="data?.result?.count /limit"
      />
    </template>
    </NuxtLayout>
    
    <PrimaryDialog icon="mdi-account-cancel-outline" @close="deleteDialog=false" v-model="deleteDialog" title="Block">
      <VForm>
        <p class="text-h6">Are you sure, you want to Block <span class="font-weight-bold"> {{ thisUser.fullName }}</span> user </p>
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
            @click="deleteDoctor(thisUser)" 
         
          >
            Save
          </VBtn>
        </VCardActions>
      </VForm>
    </PrimaryDialog>
  </div>
</template>