<script lang="ts" setup>
import { CategoreModel } from '@@/models/categoryModel'
import { useDashboardCategories, useDeleteCategory } from '@@/queries/categories'
import { computed, onMounted, ref } from 'vue'
import CreateCategoryForm from './CreateCategoryForm.vue'

definePageMeta({ layout: false })
const headers = ref([
  { align: 'center', key: 'id', sortable: true, title: 'id' },
  { align: 'center', key: 'name.en', sortable: true, title: 'Name EN' },
  { align: 'center', key: 'name.ar', sortable: true, title: 'Name AR' },
  { align: 'right', key: 'icon', sortable: true, title: ' Icon' },
  { align: 'center', key: 'actions', sortable: false, title: 'Actions' },
] as const)

const page = ref(1)
const skip = ref(0)
const limit = ref(3)

const { data, status, clear,refresh } = await useDashboardCategories({ skip: skip, limit: limit });
clear()
onMounted(()=>{
  if(!data.value)
    refresh()
})
const crateCategoryDialog = ref(false);

const thisUser = ref<CategoreModel>({ id: '', icon: '', name: { ar: '', en: '' } })

const isLoading = ref(false);
const deleteDialog = ref(false)
const deleteDoctor = async (category: CategoreModel) => {
  isLoading.value = true;
  const { status } = await useDeleteCategory(category.id)
  if (status.value == 'success') {
    deleteDialog.value = false
    isLoading.value = false
  }
}

const nextPage = (currentPage:number) => skip.value=currentPage;
const categories=computed(()=>data.value?.result?.results ? data.value?.result?.results : [] )
</script>

<template>
  <div>
    <NuxtLayout  name="dashboard" :headers="headers" :data="categories"
      table-name="Categories" @view-create-dialog="crateCategoryDialog = true" :loading="status !== 'success'"
      @deleteThisItem="(item) => { thisUser = item; deleteDialog = true; }">
      <template #pagination>
        <VPagination @update:model-value="(e) => nextPage(e)" v-model="page" :length="data?.result?.count / limit" />
      </template>
    </NuxtLayout>

    <PrimaryDialog v-model="crateCategoryDialog" title="Create Category" @close="crateCategoryDialog = false">

      <CreateCategoryForm @close="crateCategoryDialog = false" />
    </PrimaryDialog>


    <PrimaryDialog icon="mdi-account-cancel-outline" @close="deleteDialog = false" v-model="deleteDialog" title="Block">
      <VForm>
        <p class="text-h6">Are you sure, you want to delete <span class="font-weight-bold"> {{ thisUser.id }}</span>
          category </p>
        <VCardActions class="mt-4">
          <VSpacer></VSpacer>
          <VBtn color="grey-darken-3" @click="deleteDialog = false">
            Cancel
          </VBtn>
          <VBtn elevation="0" color="error" variant="elevated" :loading="isLoading" :disabled="isLoading"
            @click="deleteDoctor(thisUser)">
            Save
          </VBtn>
        </VCardActions>
      </VForm>
    </PrimaryDialog>
  </div>
</template>