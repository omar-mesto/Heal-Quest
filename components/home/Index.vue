<script lang="ts" setup>  
import { onMounted, ref } from 'vue';
import type { AdvertisementModel } from '../../models/advertismentModel';
import { api } from '../../utils/api';

const window = ref(false);  
const data = ref<AdvertisementModel[]>([]);  
const isLoading = ref(true);  

onMounted(async () => {  
  isLoading.value = true; 
  try {   
    data.value = await api.get<AdvertisementModel[]>('getAdvertisment');
  } finally {  
    isLoading.value = false;
  }  
});  
</script>  

<template>  
  <div>  
    <template v-if="isLoading">  
      <VSkeletonLoader  
        class="window-item-skeleton mt-sm-14 mt-0"  
        image  
        height="300"  
      />  
    </template>  
    <template v-else>  
      <VWindow  
        v-model="window"  
        class="mt-sm-14 mt-0"  
        show-arrows  
      >  
        <VWindowItem  
          v-for="advertisement in data.result"  
          :key="advertisement.id"  
        >  
          <VImg  
            :src="advertisement.image"  
            cover  
            height="300"  
          />  
        </VWindowItem>  
      </VWindow>  
    </template>  
  </div>  
</template>