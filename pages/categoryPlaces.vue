<script lang="ts" setup>
import { useCategoryPlaces } from '@@/queries/categoryPlaces';
import { useRoute } from 'nuxt/app';

const route = useRoute();
const queryId =route.query.id;
// const show=ref(false)
const { data, status,clear} = await useCategoryPlaces({ id:queryId });
clear()
</script>

<style>

</style>
<template>
    <div>
      <p class="text-grey-darken-4 text-h6 text-sm-h5 font-weight-medium mt-8 mt-sm-12 mb-4">
        Places {{ queryId }}
        <pre>{{ data?.result[0]?.placeService.id }}</pre>
      </p>
      <VRow class="mt-2">
        <VCol
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="placeService in data?.result"
          :key="placeService"
        >
          <v-card class="h-100 d-flex flex-column pb-4"
          @click="$router.push({path:'/PlaceServices',query: { id:placeService.placeService.id }})">
            <v-img
              height="200"
              :src="`${placeService.placeService.images[0].image}`"
              cover
              class="flex-grow-0"
            ></v-img>
  
            <v-card-title class="text-h6 text-md-h5">
              {{ placeService.placeService.places[0].name.en }}
            </v-card-title>
  
            <div class="d-flex align-center justify-space-between">
              <v-card-subtitle class="text-grey-darken-4 text-subtitle-1">
                {{ placeService.placeService.totalprice }}$
              </v-card-subtitle>
              <v-card-subtitle class="pt-1">
                <v-rating
                  :model-value="placeService.placeService.rating"
                  color="amber"
                  density="compact"
                  size="small"
                  half-increments
                  readonly
                ></v-rating>
              </v-card-subtitle>
            </div>
          </v-card>
        </VCol>
      </VRow>
    </div>
  </template>