<script lang="ts" setup>
import { ref } from 'vue';

definePageMeta({
  layout: 'dashboard',
})

const tablrItems = ref([  
  { doctor: 'Frederica Zagna', date: '22/06/2022', time: '3 pm' },  
  { doctor: 'Rosa Mann', date: '22/06/2022', time: '9 am' },  
  { doctor: 'Simon Spacs', date: '22/06/2022', time: '5 pm' },  
  { doctor: 'Frederica Zagna', date: '03/07/2022', time: '3 pm' },  
  { doctor: 'Rosa Mann', date: '27/06/2022', time: '9 am' },  
]);  
</script>

<template>
  <div>
    <VDataTable
      :items="tablrItems"
    />  
  </div>
</template>

<style>

</style>