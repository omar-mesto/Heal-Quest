<script lang="ts" setup>
import { placeServicesModel } from '@@/models/placeServiceModel'
import { useDeletePlacrService, useGetPlacrService } from '@@/queries/placeServices'
import { computed, onMounted, ref } from 'vue'
import CreateCategoryForm from '../home/CreateCategoryForm.vue'

definePageMeta({ layout: false })
const headers = ref([
  { align: 'center', key: 'id', sortable: true, title: 'Id' },
  { align: 'center', key: 'places', sortable: true, title: 'Place Name' },
  { align: 'center', key: 'services', sortable: true, title: 'Services' },
  { align: 'center', key: 'descraption', sortable: true, title: 'Descraption' },
  { align: 'center', key: 'rating', sortable: true, title: 'Rating' },
  { align: 'center', key: 'totalprice', sortable: true, title: 'Total Price' },
  { align: 'center', key: 'actions', sortable: false, title: 'Actions' },
] as const)

const page = ref(1)
const skip = ref(0)
const limit = ref(12)

const { data, status, clear,refresh } = await useGetPlacrService({ skip: skip, limit: limit });
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

const nextPage = (currentPage:number) => skip.value=currentPage;
const placeServices=computed(()=>data.value?.result?.results ? data.value?.result?.results : [] )
</script>

<template>
  <div>
    <NuxtLayout  name="dashboard" :headers="headers" :data="placeServices"
      table-name="Place Service" @view-create-dialog="cratePlaceServiceDialog = true" :loading="status !== 'success'"
      @deleteThisItem="(item) => { thisPlacrService = item; deleteDialog = true; }">
      <template #pagination>
        <VPagination @update:model-value="(e) => nextPage(e)" v-model="page" :length="data?.result?.count / limit" />
      </template>
    </NuxtLayout>

    <PrimaryDialog v-model="cratePlaceServiceDialog" title="Create Place Service" @close="cratePlaceServiceDialog = false">
      <CreateCategoryForm @close="cratePlaceServiceDialog = false" />
    </PrimaryDialog>


    <PrimaryDialog icon="mdi-delete-outline" @close="deleteDialog = false" v-model="deleteDialog" title="Delete">
      <VForm>
        <p class="text-h6">Are you sure, you want to delete <span class="font-weight-bold"> {{ thisPlacrService.id }}</span>
            Placr Service 
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