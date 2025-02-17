<script lang="ts" setup>
import { useCategoryPlaces } from '@@/queries/categoryPlaces';
import { useRoute } from 'nuxt/app';

const route = useRoute();
const query =(route.query as{id:string});
const { data } = await useCategoryPlaces( query.id );
</script>

<style>

</style>
<template>
    <div>
      <p class="text-grey-darken-4 text-h6 text-sm-h5 font-weight-medium mt-8 mt-sm-12 mb-4">
        Places 
      </p>
      {{ query.id }}
      <VRow class="mt-2">
        <VCol
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="placeService in data?.result"
          :key="placeService"
        >
           <VSheet class="border-md rounded-lg pa-2 h-100 d-flex flex-column pb-4"
         >
           <VImg  @click="$router.push({path:'/placeServices',query: { id:placeService.id }})" width="130"  rounded="lg" :src="placeService.images[0]?.image?.url"></VImg>
            <v-card-title class="text-h6 ">
              {{ placeService.name.en }}
            </v-card-title>
  
            <div class="d-flex align-center justify-space-between">
              <div  class="d-flex flex-column pt-1">
               <span>facebook: {{placeService.placeContact?.facebook  }}</span>
               <span>instagram: {{placeService.placeContact?.instagram  }}</span>
              </div>
            </div>
          </VSheet>
        </VCol>
      </VRow>
    </div>
  </template>