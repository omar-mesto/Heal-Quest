<script setup lang="ts">
import { useDeleteService, useServices } from '@@/queries/services'
import { computed, onMounted, ref } from 'vue'
import CreateServiceForm from './CreateServiceForm.vue'

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
  if(!data.value)
    refresh()
})
const crateDialog=ref(false);

const currentService=ref({})

const isLoading=ref(false);
const deleteDialog = ref(false)


const deleteService = async (id)=>{
  isLoading.value=true;
  const { status } = await useDeleteService(id)
  if(status.value =='success' ){
    deleteDialog.value=false
    isLoading.value=false
  }
}

const nextPage = (currentPage:number) => skip.value=currentPage;

const service=computed(()=>data?.value?.result?.results)
const placeImagesDialog=ref<boolean>(false)
</script>
<template>
    <NuxtLayout
    v-if="service"  
    name="dashboard"
      :headers="headers"
      :data="service"
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


    <PrimaryDialog v-model="crateDialog" title="Create Service" @close="crateDialog=false">
       <CreateServiceForm @close="crateDialog=false"/>
    </PrimaryDialog>

    <PrimaryDialog icon="mdi-account-cancel-outline" @close="deleteDialog=false" v-model="deleteDialog" title="Delete">
      <VForm>
        <p class="text-h6">Are you sure, you want to delete <span class="font-weight-bold"> {{ currentService.name?.en ? currentService.name.en : currentService.name.ar }}</span> service </p>
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
            @click="deleteService(currentService.id)"

          >
            Save
          </VBtn>
        </VCardActions>
      </VForm>
    </PrimaryDialog>

</template>