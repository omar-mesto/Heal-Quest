<script lang="ts" setup>
import { useAdvertisment } from '@@/queries/advertisment';


const {data,status}=  useAdvertisment();

</script>

<template>
  <div>
      <VSkeletonLoader
        v-if="status !='success'"
        class="window-item-skeleton"
        height="300"
      />
  
      <VCarousel height="300" v-else  hide-delimiters>
      
        <VCarouselItem
        v-for="advertisement in data?.result"
        :key="advertisement.id"
        aspect-ratio="16/9"
        :src="advertisement.image"
        eager
        lazy-src="/default-image.png"
        >
      </VCarouselItem>
      </VCarousel>
    
  </div>
</template>
