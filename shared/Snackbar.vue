<script setup lang="ts">  
import { defineEmits, defineProps } from 'vue';

const props = defineProps({  
  show: { type: Boolean, required: true },  
  message: { type: String, required: true },  
  color: { type: String, default: 'error' },  
});  

const emit = defineEmits(['closeSnackBar','showSnackBar']);  
const close_snack_bar = () => {  
  emit('closeSnackBar');  
};  


</script>  

<template>  
  <VSnackbar  
    :model-value="props.show"
    :color="props.color"  
    @close="close_snack_bar"  
  >  
    {{ props.message }}  
    <template #action="{ attrs }">  
      <VBtn  
        text  
        v-bind="attrs"  
        @click="close_snack_bar"  
      >  
        Close  
      </VBtn>  
    </template>  
  </VSnackbar>  
</template>