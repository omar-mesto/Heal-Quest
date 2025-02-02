<script lang="ts" setup>
import { useAdvertisment } from '@@/queries/advertisment';
const { data, status } = useAdvertisment()
</script>

<template>
  <div>
    <VSkeletonLoader
      v-if="status !='success'"
      class="window-item-skeleton"
      height="300"
    />
    <VCarousel
      v-else
      height="300"
      show-arrows="hover"
      hide-delimiters
    >
      <VCarouselItem

        v-for="advertisement in data?.result"
        :key="advertisement.id"
        aspect-ratio="16/9"
        :src="advertisement.image.url"
        eager
        cover
        lazy-src="/default-image.png"
      />
    </VCarousel>
  </div>
</template>
