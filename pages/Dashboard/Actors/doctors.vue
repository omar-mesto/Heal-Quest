<script lang="ts" setup>  
import { onMounted, ref } from 'vue';
import type { DoctorsModel } from '../../../models/DoctorsModel';
import { localhostAPI } from '../../../utils/localhostApi';
definePageMeta({
  layout: false,
})
const data = ref<DoctorsModel[]>([]);  
onMounted(async () => {   
  data.value = await localhostAPI.get<DoctorsModel[]>('getDoctor');  
});
const headers = ref([  
  { title: 'fullName', align: 'center', sortable: true, key: 'fullName' },  
  { title: 'mobileNumber', align: 'center', sortable: true, key: 'mobileNumber' },  
  { title: 'createdAt', align: 'center', sortable: true, key: 'createdAt' },  
  { title: 'updatedAt', align: 'center', sortable: true, key: 'updatedAt' },  
  { title: 'image', align: 'right', sortable: true, key: 'image.image' },  
  { title: 'Actions',align: 'center', key: 'actions', sortable: false },  
]);  
</script>  

<template>
  <div>
    <NuxtLayout
      name="dashboard"
      :headers="headers"
      :data="data?.result"
      table-name="Doctors"
    >
      <template #newItem>
        testssss
      </template>
    </NuxtLayout>
  </div>
</template>