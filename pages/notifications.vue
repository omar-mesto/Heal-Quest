<script lang="ts" setup>
import { ref } from 'vue'
const notifications = ref([
      {
        'id': 1,
        'text':'test',
        'description':'testtesttesttesttesttesttesttesttesttesttesttest'
      },
      {
        'id': 1,
        'text':'test',
        'description':'testtesttesttesttesttesttesttesttesttesttesttest'
      },
      {
        'id': 1,
        'text':'test',
        'description':'testtesttesttesttesttesttesttesttesttesttesttest'
      },
      {
        'id': 1,
        'text':'test',
        'description':'testtesttesttesttesttesttesttesttesttesttesttest'
      },
      {
        'id': 1,
        'text':'test',
        'description':'testtesttesttesttesttesttesttesttesttesttesttest'
      },
      {
        'id': 1,
        'text':'test',
        'description':'testtesttesttesttesttesttesttesttesttesttesttest'
      },{
        'id': 1,
        'text':'test',
        'description':'testtesttesttesttesttesttesttesttesttesttesttest'
      },
      {
        'id': 1,
        'text':'test',
        'description':'testtesttesttesttesttesttesttesttesttesttesttest'
      }
    ],
)
</script>
<template>
    <div>
      <p class="text-grey-darken-4 text-h4 font-weight-medium mt-12">
        Notifications
      </p>
      <VContainer
        class="fill-height"
        fluid
      >
        <VRow justify="center" align="center">
          <VCol cols="10">
         <VList>

      <VListItem

        v-for="notification in notifications"
        :key="notification.id"
        class="bg-grey-lighten-4 my-4 pa-2 rounded-lg"
      >
        <template v-slot:append>
          <v-btn
              color="grey-lighten-1"
              variant="text"
          ></v-btn>
        </template>
        <VListItemTitle class="text-h6 text-grey-darken-4">
          {{ notification.text }}
        </VListItemTitle>
        <VListItemSubtitle>
          {{ notification.description }}
        </VListItemSubtitle>
      </VListItem>
    </VList>
      </VCol>
        </VRow>
    </VContainer>
    </div>
</template>  
<style>
  
</style>