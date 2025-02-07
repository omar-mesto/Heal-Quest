<script lang="ts" setup>
import { useAllServices } from '@@/queries/services';
import { useRoute } from 'nuxt/app';
import { computed } from 'vue';

const route = useRoute();
const query =(route.query as {id:string});
const { data,clear, status} = await useAllServices(query.id);
clear();
const isLoading = computed(() => (status.value != 'success' && status.value != 'error'))
const isCompleteLoading = computed(() => (status.value == 'success' || status.value == 'error'))
</script>

<style>

</style>
<template>
    <div v-if="data">
      <p class="text-grey-darken-4 text-h6 text-sm-h5 font-weight-medium mt-2 mt-sm-12 mb-4">
        Place Services
      </p>
        <VRow>
          <VCol cols="3">
            <VSheet class="pa-4 rounded-lg border-md">
              <p class="text-h5">Name:</p>
              <div class="d-flex  justify-end">
            <VBtn
                variant="elevated"
                color="primary"
                class="text-none mr-3"
                type="submit"
                large
            >
                Add to Cart
            </VBtn>
        </div>
            </VSheet>
          </VCol>
          <VCol cols="3">
            <VSheet class="pa-4 rounded-lg border-md">
              <p class="text-h5">Name:</p>
              <div class="d-flex  justify-end">
            <VBtn
                variant="elevated"
                color="primary"
                class="text-none mr-3"
                type="submit"
                large
            >
                Add to Cart
            </VBtn>
        </div>
            </VSheet>
          </VCol>
          <VCol cols="3">
            <VSheet class="pa-4 rounded-lg border-md">
              <p class="text-h5">Name:</p>
              <div class="d-flex  justify-end">
            <VBtn
                variant="elevated"
                color="primary"
                class="text-none mr-3"
                type="submit"
                large
            >
                Add to Cart
            </VBtn>
        </div>
            </VSheet>
          </VCol>
          <VCol cols="3">
            <VSheet class="pa-4 rounded-lg border-md">
              <p class="text-h5">Name:</p>
              <div class="d-flex  justify-end">
            <VBtn
                variant="elevated"
                color="primary"
                class="text-none mr-3"
                type="submit"
                large
            >
                Add to Cart
            </VBtn>
        </div>
            </VSheet>
          </VCol>
        </VRow>
    
    </div>
</template>