<script setup lang="ts">
const model = defineModel<boolean>()
defineProps<{
  icon?: string
  title: string
}>()
defineEmits(['close'])
</script>

<template>
  <VDialog
    v-model="model"
    persistent
    v-bind="$attrs"
    :max-width="$vuetify.display.smAndDown ? '100%' : '40%'"
    :fullscreen="$vuetify.display.smAndDown"
  >
    <VContainer>
      <VCard>
        <VCardTitle class="d-flex align-center justify-space-between">
          <div class="d-flex">
            <VIcon
              color="grey-darken-3"
              class="me-2"
            >
              {{ icon ? icon : 'mdi-account-plus-outline' }}
            </VIcon>
            <p class="text-h5 text-grey-darken-3">
              {{ title }}
            </p>
          </div>
          <div>
            <VBtn
              variant="text"
              icon="mdi-close"
              size="large"
              @click="$emit('close')"
            />
          </div>
        </VCardTitle>
        <VCardText style="overflow-y: auto; max-height: 80vh;">
          <slot />
        </VCardText>
      </VCard>
    </VContainer>
  </VDialog>
</template>