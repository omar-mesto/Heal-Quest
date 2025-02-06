<script lang="ts" setup>
import { PlacesModel } from '@@/models/placeModel'
import { useDeleteDoctor } from '@@/queries/doctors'
import { usePlaces } from '@@/queries/plcaes'
import { computed, onMounted, ref } from 'vue'
import CreatePlaceForm from './CreatePlaceForm.vue'

definePageMeta({layout:false})
const headers = ref([
  { align: 'center', key: 'id', sortable: true, title: 'ID' },
  { align: 'center', key: 'name.en', sortable: true, title: 'English Name' },
  { align: 'center', key: 'name.ar', sortable: true, title: 'Arabic Name' },
  { align: 'center', key: 'adress', sortable: true, title: 'Adress' },
  { align: 'center', key: 'placeContact', sortable: false, title: 'place Contact' },
  { align: 'right',  key: 'images[0].data', sortable: true, title: 'Images' },
  { align: 'center', key: 'actions', sortable: false, title: 'Actions' },
] as const)

const page=ref(0)
const skip = ref(0)
const limit = ref(2)
const { data, status,clear,refresh } = usePlaces();
clear()

onMounted(()=>{
  if(!data.value)
    refresh()
})
const cratePlaceDialog=ref(false);

const thisPlace=ref<PlacesModel>({id:'',adress:'',images:[{data:''}],name:{ar:'',en:''},placeContact:''})

const isLoading=ref(false);
const deleteDialog = ref(false)

const showAllImage = async (place:PlacesModel)=>{
    console.log(place.id)
    

}

const deletePlace = async (place:PlacesModel)=>{
  isLoading.value=true;
  const { status } = await useDeleteDoctor(place.id)
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
const places=computed(()=>data.value?.result)
</script>

<template>
  <div >
    <NuxtLayout
      name="dashboard"
      :headers="headers"
      :data="places"
      table-name="Place"
      :loading="status!=='success'"
      dialogHeaderTitle="Create Doctor"
      @view-create-dialog="cratePlaceDialog=true"
      @deleteThisItem="(item)=>{thisPlace=item; deleteDialog=true;}"
    >
    <VIcon
        size="30"
        @click="showAllImage(thisPlace)"
        class="mx-2 cursor-pointer"s
    >
        {{ 'mdi mdi-image-multiple-outline' }}
    </VIcon>
    <template #pagination>
      <VPagination

      @update:model-value="(e)=>nextPage(e)"
        v-model="page"
        :length="data?.result?.count /limit"
      />
    </template>
    </NuxtLayout>
    
    <PrimaryDialog v-model="cratePlaceDialog" title="Create Doctor" @close="cratePlaceDialog=false">
       <CreatePlaceForm @close="cratePlaceDialog=false"/>
    </PrimaryDialog>
    
    <PrimaryDialog icon="mdi-account-cancel-outline" @close="deleteDialog=false" v-model="deleteDialog" title="Delete">
      <VForm>
        <p class="text-h6">Are you sure, you want to delete <span class="font-weight-bold"> {{ thisPlace.name.en }}</span> doctor </p>
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
            @click="deletePlace(thisPlace)" 
         
          >
            Save
          </VBtn>
        </VCardActions>
      </VForm>
    </PrimaryDialog>
  </div>
</template>