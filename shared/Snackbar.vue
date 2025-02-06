<script setup lang="ts">
import { defineEmits, defineProps ,defineModel} from 'vue'
import {useGlobalStore} from "@@/stores/global";
const props = defineProps({
  color: { default: 'error', type: String },
  message: { required: true, type: String },
})

const emit = defineEmits(['closeSnackBar', 'showSnackBar'])
const close_snack_bar = () => {
  emit('closeSnackBar')
}
const globalStore=useGlobalStore();
</script>

<template>
  <VSnackbar
      timeout="3000"
      :model-value="true"
    :color="props.color"
    @close="close_snack_bar"
  >
    {{ props.message }}
    <template #actions>
      <VBtn
        variant="text"

        @click="()=>globalStore.error=''"
      >
        Close
      </VBtn>
    </template>
  </VSnackbar>
</template>