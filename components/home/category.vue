<script lang="ts" setup>  
import { useAsyncData, useNuxtApp } from 'nuxt/app';

const { $api } = useNuxtApp();  

const { data } = await useAsyncData('categories', async () => {  
  const response = await $api('/getCategories');  
  
  return response;  
});  
</script>  

<template>  
  <div>  
    <VRow class="py-5">
      <VCol  
        v-for="category in data?.result?.slice(1, 7) || []"
            
        :key="category.id"  
        cols="6"  
        md="2"  
      >  
        <VCard  
          class="mx-auto text-center h-100 cursor-pointer"  
        >  
          <VAvatar size="50">  
            <VImg :src="`${category.icon}`" />  
          </VAvatar>  
          <VCardText>  
            {{ category.name.en }}  
          </VCardText>  
        </VCard>  
      </VCol>  
    </VRow>  
  </div>  
</template>