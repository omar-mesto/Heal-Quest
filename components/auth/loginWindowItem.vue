<script lang="ts" setup>

const props = defineProps<{
  message: string;
  step: number;
  title: string;
}>()
</script>

<template>
  <div>
    <VWindowItem :value="props.step">
      <VRow>
        <VCol
          cols="12"
          sm="12"
          md="6"
          class="d-flex h-screen justify-center align-center"
        >
          <div class="w-75">
            <VCardTitle class="text-center text-h4 font-weight-bold">
              {{ props.title }}
            </VCardTitle>
            <VCardText>
              <p class="text-center py-4">
                {{ props.message }}
              </p>
              <slot name="form" />
            </VCardText>
          </div>
        </VCol>
        <VCol
          cols="0"
          sm="0"
          md="6"
          class="d-md-block d-none justify-center align-center bg-primary"
        >
          <slot name="image" />
          <div class="text-center py-5">
            <slot name="buttons" />
          </div>
        </VCol>
      </VRow>
    </VWindowItem>
  </div>
</template>

<style lang="scss" scoped></style>
