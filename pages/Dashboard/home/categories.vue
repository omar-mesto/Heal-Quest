<script lang="ts" setup>
import { categoryModel } from '@@/models/categoryModel'
import { useDashboardCategories, useDeleteCategory } from '@@/queries/categories'
import { ref } from 'vue'
import CreateCategoryForm from './createCategoryForm.vue'

definePageMeta({layout:false,middleware:'auth'})
const headers = ref([
  { align: 'center', key: 'id', sortable: true, title: 'id' },
  { align: 'center', key: 'name.en', sortable: true, title: 'Name EN' },
  { align: 'center', key: 'name.ar', sortable: true, title: 'Name AR' },
  { align: 'center', key: 'icon', sortable: true, title: 'Icon' },
  { align: 'center', key: 'actions', sortable: false, title: 'Actions' },
] as const)

const page=ref(0)
const skip = ref(0)
const limit = ref(3)

const { data, status,clear} = useDashboardCategories({ skip: skip, limit: limit });
clear()

const crateCategoryDialog=ref(false);

const thisUser=ref<categoryModel>({id:'',icon:'',name:{ar:'',en:''}})

const isLoading=ref(false);
const deleteDialog = ref(false)
const deleteDoctor = async (category:categoryModel)=>{
  isLoading.value=true;
  const { status } = await useDeleteCategory(category.id)
  if(status.value =='success' ){
    deleteDialog.value=false
    isLoading.value=false
  }
}

const nextPage=(currentPage:number)=>{
  if(currentPage>page.value){

    skip.value+=limit.value;
    page.value++;
  }
  else
  {
    skip.value-=limit.value;
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
      table-name="Categories"
       @view-create-dialog="crateCategoryDialog=true"
      :loading="status!=='success'"
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
    
    <PrimaryDialog v-model="crateCategoryDialog" title="Create Category" @close="crateCategoryDialog=false">
      
      <CreateCategoryForm @close="crateCategoryDialog=false"/>
    </PrimaryDialog>


    <PrimaryDialog icon="mdi-account-cancel-outline" @close="deleteDialog=false" v-model="deleteDialog" title="Block">
      <VForm>
        <p class="text-h6">Are you sure, you want to delete <span class="font-weight-bold"> {{ thisUser.id }}</span> category </p>
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
