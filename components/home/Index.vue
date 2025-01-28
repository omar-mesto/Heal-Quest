<script lang="ts" setup>
import { AdvertisementModel } from '@@/models/advertismentModel'
import { useAPI } from '@@/services/baseApi'
import { ref } from 'vue'

const window = ref(false)
const { data, status } = await useAPI<AdvertisementModel[]>('/getAdvertisment')

</script>

<template>
  <div>
    <template v-if="status !='success'">
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
          v-for="advertisement in data?.result"
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
