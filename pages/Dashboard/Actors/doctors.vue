<script lang="ts" setup>  
import { onMounted, ref } from 'vue';
import type { DoctorsModel } from '../../../models/DoctorsModel';
import { localhostAPI } from '../../../utils/localhostApi';
definePageMeta({
  layout: false,
})

const Loading = ref(true);   
const data = ref<{'result' : DoctorsModel[]}>({ 'result':[] });  
onMounted(async () => {   
  Loading.value = true;
  data.value = await localhostAPI.get<{'result' : DoctorsModel[]}>('getDoctor');  
  Loading.value = false;
});
const headers = ref([  
  { title: 'full Name', align: 'center', sortable: true, key: 'fullName' },  
  { title: 'mobile Number', align: 'center', sortable: true, key: 'mobileNumber' },  
  { title: 'created At', align: 'center', sortable: true, key: 'createdAt' },  
  { title: 'updated At', align: 'center', sortable: true, key: 'updatedAt' },  
  { title: 'image', align: 'right', sortable: true, key: 'image.image' },  
  { title: 'Actions',align: 'center', key: 'actions', sortable: false },  
] as const);  
const saveDoctor=()=>{
  console.log('save doctor')
}
const updateDoctor=()=>{
  console.log('updateDoctor')
}
</script>   

<template>
  <div>
    <NuxtLayout
      name="dashboard"
      :headers="headers"
      :data="data.result"
      table-name="Doctors"
      :loading="Loading"
      @save="saveDoctor"
      @update="updateDoctor"
    >
      <template #newItem>
        <VRow>
          <VCol
            cols="12"
            md="6"
            sm="6"
          >
            <VTextField
              label="fullName"
              focus-all
              :length="4"
              variant="outlined"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
            sm="6"
          >
            <VTextField
              label="username "
              focus-all
              :length="4"
              variant="outlined"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
            sm="6"
          >
            <VTextField
              label="birth date"
              focus-all
              :length="4"
              variant="outlined"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
            sm="6"
          >
            <VTextField
              label="mobile Number"
              focus-all
              :length="4"
              variant="outlined"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
            sm="6"
          >
            <VTextField
              label="Password"
              focus-all
              :length="4"
              variant="outlined"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
            sm="6"
          >
            <VFileInput
              clearable
              label="image"
              variant="outlined"
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
            sm="6"
          >
            <VRadioGroup
              inline
              label="Radio group label"
            >
              <VRadio
                label="male"
                value="male"
              />
              <VRadio
                label="femal"
                value="femal"
              />
            </VRadioGroup>
          </vcol>
        </VRow>
      </template>
    </NuxtLayout>
  </div>
</template>