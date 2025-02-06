<script lang="ts" setup>
import { useCategoryPlacesById } from '@@/queries/categoryPlaces';
import { useRoute } from 'nuxt/app';
import { computed } from 'vue';

const route = useRoute();
const queryId =route.query.id;
const { data, status} = await useCategoryPlacesById({ id:queryId });
const isLoading = computed(() => (status.value != 'success' && status.value != 'error'))
const isCompleteLoading = computed(() => (status.value == 'success' || status.value == 'error'))
</script>

<style>

</style>
<template>
    <div>
      <p class="text-grey-darken-4 text-h6 text-sm-h5 font-weight-medium mt-2 mt-sm-2 mb-4">
        Place Services
      </p>
        
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

        v-for="placeImages in data?.result?.placeService?.images"
        :key="placeImages"
        aspect-ratio="16/9"
        :src="placeImages.image.url"
        eager
        cover
        lazy-src="/default-image.png"
      />
    </VCarousel>
    <VRow class="mt-2 d-flex justify-center">
      <VCol
        v-for="index in (isLoading && !isCompleteLoading) ? 6 : 0"
        :key="index"
        cols="6"
        md="2"
      >
        <VSkeletonLoader
          class="window-item-skeleton"
          card
          height="100"
        />
      </VCol>
      <VCol
      v-for="service in data?.result?.placeService?.services"
        :key="service"
        cols="6"
        md="2"
      >
        <VCard
          class="mx-auto text-center h-100 cursor-pointer"
        >
          <VCardText>
            {{ service.name.en }} 
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <p class="text-grey-darken-4 text-h6 text-sm-h5 font-weight-medium mt-8 mt-sm-12 mb-4">
      descraption
    </p>
    <p class="text-grey-darken-4 text-h6 text-sm-h5 font-weight-medium  mb-4">
        {{ data?.result?.placeService?.descraption }}
    </p>
    </div>
</template>