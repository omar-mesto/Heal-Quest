<template>  
  <div>
    <v-window v-model="window" class="mt-sm-14 mt-0" show-arrows>  
       <v-window-item v-for="advertisement in advertisementStore.advertisements" :key="advertisement.id">
        <v-card  
          class="d-flex justify-center align-center"  
          height="330px"  
          :style="{  
            backgroundImage: `url(${advertisement.image})`,  
            backgroundSize: 'cover',  
            backgroundPosition: 'center'  
          }"  
        >     
        </v-card>  
        
      </v-window-item>  
    </v-window> 
     
  </div>  
</template>  

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useAdvertisementsStore } from '../../store/home/useAdvertisementsStore';

const advertisementStore = useAdvertisementsStore();
const window = ref(1);

onMounted(() => {
  advertisementStore.fetchAdvertisements();
});
</script>

<style>  
</style>