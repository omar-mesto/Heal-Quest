<script setup lang="ts">
import { useDeleteService, useServices } from '@@/queries/services'
import { computed, onMounted, ref } from 'vue'

definePageMeta({layout:false})
const headers = ref([
  { align: 'center', key: 'name.en', sortable: true, title: 'English Name' },
  { align: 'center', key: 'name.ar', sortable: true, title: 'Arabic Name' },
  { align: 'center', key: 'actions', sortable: false, title: 'Actions' },
] as const)

const page=ref(0)
const skip = ref(0)
const limit = ref(12)
const { data, status,clear,refresh } = useServices({limit:limit,skip:skip});
clear()

onMounted(()=>{
    
//   if(!data.value)
    refresh()
})
const crateDialog=ref(false);

const currentService=ref({})

const isLoading=ref(false);
const deleteDialog = ref(false)


const deleteService = async (service:{id:string})=>{
  isLoading.value=true;
  const { status } = await useDeleteService(service.id)
  if(status.value =='success' ){
    deleteDialog.value=false
    isLoading.value=false
  }
}

const nextPage = (currentPage:number) => skip.value=currentPage;

const places=computed(()=>data.value?.result?.results)
const placeImagesDialog=ref<boolean>(false)
</script>
<template>
    <NuxtLayout
      name="dashboard"
      :headers="headers"
      :data="places"
      table-name="Service"
      :loading="status!=='success'"
      dialogHeaderTitle="Create Service"
      @view-create-dialog="crateDialog=true"
      @deleteThisItem="(item)=>{currentService=item; deleteDialog=true;}"
    >

    <template #pagination>
        <VPagination @update:model-value="(e) => nextPage(e)" v-model="page" :length="data?.result?.count / limit" />
    </template>
    </NuxtLayout>

</template>