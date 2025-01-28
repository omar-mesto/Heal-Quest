<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
  color: { default: 'error', type: String },
  message: { required: true, type: String },
  show: { required: true, type: Boolean },
})

const emit = defineEmits(['closeSnackBar', 'showSnackBar'])
const close_snack_bar = () => {
  emit('closeSnackBar')
}

</script>

<template>
  <VSnackbar
    :model-value="props.show"
    :color="props.color"
    @close="close_snack_bar"
  >
    {{ props.message }}
    <template #actions>
      <VBtn
        variant="text"

        @click="close_snack_bar"
      >
        Close
      </VBtn>
    </template>
  </VSnackbar>
</template>
