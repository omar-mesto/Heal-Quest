<script lang="ts" setup>
import { useCategories } from '@@/queries/categories';
import { computed } from 'vue';

const { data, status } = useCategories()
const isLoading = computed(() => (status.value != 'success' && status.value != 'error'))
const isCompleteLoading = computed(() => (status.value == 'success' || status.value == 'error'))
</script>

<template>
  <div>
    <p class="text-grey-darken-4 text-h5 font-weight-medium mt-12 mb-4 ">
      Disease categories
    </p>
    <VRow class="mt-2">
      <VCol
        v-for="index in (isLoading && !isCompleteLoading) ? 12 : 0"
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
        v-for="index in isCompleteLoading ? data?.result.length : 0"
        :key="index"
        cols="6"
        md="2"
      >
        <VCard
          class="mx-auto text-center h-100 cursor-pointer"
          @click="$router.push({path:'/categoryPlaces',query: { id: data?.result[index-1]?.id }})"
        >
          <VAvatar size="50">
            <VImg
              lazy-src="/default-image.png"
              :src="data?.result[index-1]?.icon?.url ? data?.result[index-1]?.icon?.url : '/default-image.png'"
            />
          </VAvatar>
          <VCardText>
            {{ data?.result[index-1]?.name?.en }} 
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
