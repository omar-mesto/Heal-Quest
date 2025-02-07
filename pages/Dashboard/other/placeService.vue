<script lang="ts" setup>
import { placeServicesModel } from '@@/models/placeServiceModel'
import { useDeletePlacrService, useGetAllPlaceService } from '@@/queries/placeServices'
import { computed, onMounted, ref } from 'vue'
import CreateCategoryForm from '../home/CreateCategoryForm.vue'
import CreatePlaceService from '../home/CreatePlaceService.vue'

definePageMeta({ layout: false })
const headers = ref([
  { align: 'center', key: 'service.name.ar', sortable: true, title: 'Service name' },
  { align: 'center', key: 'place.name.ar', sortable: true, title: 'Place name' },
  { align: 'center', key: 'descraption.ar', sortable: true, title: 'Descraption arabic' },
  { align: 'center', key: 'descraption.en', sortable: true, title: 'Descraption english' },
  { align: 'center', key: 'price', sortable: true, title: 'Price' },
  { align: 'center', key: 'actions', sortable: false, title: 'Actions' },
] as const)


const { data, status, clear,refresh } = await useGetAllPlaceService();
clear()
onMounted(()=>{
  if(!data.value)
    refresh()
})
const cratePlaceServiceDialog = ref(false);

const thisPlacrService = ref<placeServicesModel>({id: '',createdAt:'',descraption:'',places:[{name:{ar:'',en:''}}],services:[{name:{ar:'',en:''}}],totalprice:0,rating:0 })

const isLoading = ref(false);
const deleteDialog = ref(false)
const deletePlaceService = async (placeService: placeServicesModel) => {
  isLoading.value = true;
  const { status } = await useDeletePlacrService(placeService.id)
  if (status.value == 'success') {
    deleteDialog.value = false
    isLoading.value = false
  }
}

const placeServices=computed(()=>data.value?.result)
</script>

<template>
  <div>
    <NuxtLayout v-if="placeServices"  name="dashboard" :headers="headers" :data="placeServices"
      table-name="Place Service" @view-create-dialog="cratePlaceServiceDialog = true" :loading="status !== 'success'"
      @deleteThisItem="(item) => { thisPlacrService = item; deleteDialog = true; }">
      
    </NuxtLayout>

    <PrimaryDialog v-model="cratePlaceServiceDialog" title="Create Place Service" @close="cratePlaceServiceDialog = false">
      <CreatePlaceService @close="cratePlaceServiceDialog = false" />
    </PrimaryDialog>


    <PrimaryDialog icon="mdi-delete-outline" @close="deleteDialog = false" v-model="deleteDialog" title="Delete">
      <VForm>
        <p class="text-h6">Are you sure, you want to delete <span class="font-weight-bold"> {{ thisPlacrService.id }}</span>
            Place Service 
        </p>
        <VCardActions class="mt-4">
          <VSpacer></VSpacer>
          <VBtn color="grey-darken-3" @click="deleteDialog = false">
            Cancel
          </VBtn>
          <VBtn elevation="0" color="error" variant="elevated" :loading="isLoading" :disabled="isLoading"
            @click="deletePlaceService(thisPlacrService)">
            Save
          </VBtn>
        </VCardActions>
      </VForm>
    </PrimaryDialog>
  </div>
</template>