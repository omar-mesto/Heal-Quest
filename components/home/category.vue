<script lang="ts" setup>  
import { onMounted, ref } from 'vue';
import type { CategoryModel } from '../../models/categoryModel';
import { api } from '../../utils/api';

const isLoading = ref(true);   
const data = ref<CategoryModel[]>([]);

onMounted(async () => {  
  isLoading.value = true;   
  try {   
    data.value = await api.get<CategoryModel[]>('getCategories');  
  } finally {  
    isLoading.value = false;  
  }  
});  
</script>  

<template>  
  <div>  
    <VRow class="py-5">  
      <VCol  
        v-for="index in (isLoading ? 6 : Math.min(data.result?.length || 0, 6))"
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
  </div>  
</template>
