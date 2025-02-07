<script lang="ts" setup>
import { ref } from 'vue';
const plans = ref([
      {
        'id': 1,
        'text':'test',
        'status':'pending'
      }
    ],
)
  </script>
  
  <style>
  
  </style>
<template>
    <div>
        <p class="text-grey-darken-4 text-h5 font-weight-medium mt-12">
            Your Plans
        </p>
        <VContainer
        class="fill-height"
        fluid
      >
    <VRow justify="center" align="center">
      <VCol cols="10">
    <VList>

      <VListItem

        v-for="plan in plans"
        :key="plan.id"
        class="bg-grey-lighten-4 my-4 pa-2 rounded-lg"
      >
        <VListItemTitle class="text-h6 text-grey-darken-4">
            {{ plan.text }}
        </VListItemTitle>
        <VListItemSubtitle class="pt-1 mx-2">
          {{ plan.status }}
        </VListItemSubtitle>
        <div class="d-flex  justify-end">
            <VBtn
                variant="elevated"
                color="primary"
                class="text-none mr-3"
                type="submit"
                large
            >
                Reject
            </VBtn>
            <VBtn
                variant="elevated"
                color="error"
                class="text-none"
                type="submit"
                large
            >
                Accept
            </VBtn>
        </div>
      </VListItem>
    </VList>
      </VCol>
    </VRow>
      </VContainer>
    </div>
</template>