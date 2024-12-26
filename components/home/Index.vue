<script lang="ts" setup>  
import { useAsyncData, useNuxtApp } from 'nuxt/app';
import { ref } from 'vue';

const { $api } = useNuxtApp();  
const window = ref(false);

const { data } = await useAsyncData('advertisement', async () => {  
  const response = await $api('/getAdvertisment'); 
  
  return response;  
}); 
</script>  

<template>  
  <div>  
    <VWindow  
      v-model="window"  
      class="mt-sm-14 mt-0"  
      style="margin-top:0"  
      show-arrows  
    >  
      <VWindowItem  
        v-for="advertisement in data?.result || []"
        :key="advertisement.id"  
      >  
        <VImg  
          :src="advertisement.image"  
          cover  
          height="300"  
        />  
      </VWindowItem>  
    </VWindow>  
  </div>  
</template>