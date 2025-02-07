<script lang="ts" setup>
import { PlacesModel } from '@@/models/placeModel'
import { useDeleteDoctor } from '@@/queries/doctors'
import { usePlaces } from '@@/queries/plcaes'
import { computed, onMounted, ref } from 'vue'
import CreatePlaceForm from './CreatePlaceForm.vue'

definePageMeta({layout:false})
const headers = ref([
  { align: 'center', key: 'name.en', sortable: true, title: 'English Name' },
  { align: 'center', key: 'name.ar', sortable: true, title: 'Arabic Name' },
  { align: 'center', key: 'adress', sortable: true, title: 'Address' },
  { align: 'center', key: 'category.name.ar', sortable: true, title: 'category' },
  { align: 'center', key: 'placeContact.facebook', sortable: true, title: 'Facebook' },
  { align: 'center', key: 'placeContact.instagram', sortable: true, title: 'Instagram' },
  { align: 'center', key: 'placeContact.mobile', sortable: true, title: 'Phone number',nowrap:true },
  // { align: 'center', key: 'placeContact', sortable: false, title: 'place Contact' },
  { align: 'center',  key: 'viewImages', sortable: true, title: 'View images' },
  { align: 'center', key: 'actions', sortable: false, title: 'Actions' },
] as const)

const page=ref(0)
const skip = ref(0)
const limit = ref(12)
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
const placeImagesDialog=ref<boolean>(false)
const currentPlace =ref({});
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
      @viewPlaceImages="(item)=>{currentPlace=item;placeImagesDialog=true}"
    >

    <template #pagination>
      <VPagination

      @update:model-value="(e)=>nextPage(e)"
        v-model="page"
        :length="data?.result?.count /limit"
      />
    </template>
    </NuxtLayout>

    <PrimaryDialog v-model="cratePlaceDialog" title="Create Place" @close="cratePlaceDialog=false">
       <CreatePlaceForm @close="cratePlaceDialog=false"/>
    </PrimaryDialog>

    <PrimaryDialog icon="mdi-account-cancel-outline" @close="deleteDialog=false" v-model="deleteDialog" title="Delete">
      <VForm>
        <p class="text-h6">Are you sure, you want to delete <span class="font-weight-bold"> {{ thisPlace.name?.en ? thisPlace.name.en : thisPlace.name.ar }}</span> place </p>
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

    <PrimaryDialog width="50%" icon="mdi-image-multiple-outline" @close="placeImagesDialog=false"  v-model="placeImagesDialog" title="Place images" >
      <VRow justify="center" align="center" >

        <VCol v-for="image in currentPlace?.images"
              :cols="currentPlace?.images?.length > 9 ? '4' :'6' "
        >
         <VImg
             lazy-src="/default-image.png"
                class="mx-auto border-sm rounded-lg"
                width="230"
                :src="image.image"
         />
        </VCol>
      </VRow>
    </PrimaryDialog>
  </div>
</template>