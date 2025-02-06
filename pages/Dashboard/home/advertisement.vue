<script lang="ts" setup>
import { AdvertisementModel } from '@@/models/advertismentModel'
import { useDashboardAdvertisment, useDeleteAdvertisment } from '@@/queries/advertisment'
import { onMounted, ref } from 'vue'
import CreateAdvertisementForm from './CreateAdvertisementForm.vue'

definePageMeta({ layout: false })
const headers = ref([
  { align: 'center', key: 'id', sortable: true, title: 'id' },
  { align: 'right', key: 'image.url', sortable: true, title: 'Image' },
  { align: 'center', key: 'actions', sortable: false, title: 'Actions' },
] as const)

const page = ref(0)
const skip = ref(0)
const limit = ref(3)

const { data, status, clear,refresh } = useDashboardAdvertisment({ skip: skip, limit: limit });
clear()

onMounted(()=>{
  if(!data.value)
    refresh()
})

const createAdvertismentDialog = ref(false);

const thisUser = ref<AdvertisementModel>({ id: '', image:''} )

const isLoading = ref(false);
const deleteDialog = ref(false)
const deleteAdvertisment = async (advertisment: AdvertisementModel) => {
  isLoading.value = true;
  const { status } = await useDeleteAdvertisment(advertisment.id)
  if (status.value == 'success') {
    deleteDialog.value = false
    isLoading.value = false
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
  <div>
    <NuxtLayout v-if="data?.result?.results?.length" name="dashboard" :headers="headers" :data="data?.result?.results"
      table-name="Advertisment" @view-create-dialog="createAdvertismentDialog = true" :loading="status !== 'success'"
      @deleteThisItem="(item) => { thisUser = item; deleteDialog = true; }">
      <template #pagination>
        <VPagination @update:model-value="(e) => nextPage(e)" v-model="page" :length="data?.result?.count / limit" />
      </template>
    </NuxtLayout>

    <PrimaryDialog v-model="createAdvertismentDialog" title="Create Category" @close="createAdvertismentDialog = false">
      <CreateAdvertisementForm @close="createAdvertismentDialog = false" />
    </PrimaryDialog>


    <PrimaryDialog icon="mdi-account-cancel-outline" @close="deleteDialog = false" v-model="deleteDialog" title="Delete">
      <VForm>
        <p class="text-h6">Are you sure, you want to delete <span class="font-weight-bold"> {{ thisUser.id }} </span>
          advertisment </p>
        <VCardActions class="mt-4">
          <VSpacer></VSpacer>
          <VBtn color="grey-darken-3" @click="deleteDialog = false">
            Cancel
          </VBtn>
          <VBtn elevation="0" color="error" variant="elevated" :loading="isLoading" :disabled="isLoading"
            @click="deleteAdvertisment(thisUser)">
            Save
          </VBtn>
        </VCardActions>
      </VForm>
    </PrimaryDialog>
  </div>
</template>