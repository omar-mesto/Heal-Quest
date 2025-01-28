<script lang="ts" setup>
// import { useCategories } from '@/queries/categories';

// const {data,status}=  useCategories();

</script>

<template>
  <div class="">
    category page
  </div>
  <!-- {{ status }} -->
  <!-- <div>
    <VRow class="py-5">
      <VCol
        v-for="index in 6"
        :key="isLoading ? index : data.result[index]?.id"
        cols="6"
        md="2"
      >
        <template v-if="isLoading">
          <VSkeletonLoader
            class="window-item-skeleton"
            card
            height="100"
          />
        </template>
        <template v-else>
          <VCard
            class="mx-auto text-center h-100 cursor-pointer"
          >
            <VAvatar size="50">
              <VImg :src="data.result[index]?.icon" />
            </VAvatar>
            <VCardText>
              {{ data.result[index]?.name.en }}
            </VCardText>
          </VCard>
        </template>
      </VCol>
    </VRow>
  </div> -->
</template>
