<script setup lang="ts">
const model = defineModel<boolean>();
defineProps<{
  title:string
  icon?:string
}>()
defineEmits(['close'])
</script>
<template>

<VDialog
persistent
                  v-model="model"
                  max-width="40%"

                >
             <VContainer>

                  <VCard>
                    <VCardTitle class="d-flex align-center justify-space-between " >
                      <div class="d-flex">

                        <VIcon color="grey-darken-3" class="me-2">{{ icon ? icon : 'mdi-account-plus-outline' }}</VIcon>
                        <p class="text-h5 text-grey-darken-3">{{ title }}</p>
                      </div>
                      <div>
                        <VBtn @click="$emit('close')" variant="text" icon="mdi-close" size="large" />
                      </div>

                      
                    </VCardTitle>
<VCardText>
  <slot></slot>
</VCardText>
           
                
                  </VCard>
             </VContainer>    

                </VDialog>
</template>