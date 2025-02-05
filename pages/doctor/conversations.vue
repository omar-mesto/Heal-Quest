<script setup lang="ts">

import { ref } from 'vue'
import {useRouter} from "nuxt/app";

const users = ref([
      {
        'email': 'john@example.com',
        'id': 1,
        'image': 'https://placehold.co/200x200?textphoot',
        'phoneNumber': '123-456-7890',
        'userName': 'john_doe',
      },
      {
        'email': 'jane@example.com',
        'id': 2,
        'image': 'https://placehold.co/200x200?textphoot',
        'phoneNumber': '987-654-3210',
        'userName': 'jane_smith',
      },
      {
        'email': 'alice@example.com',
        'id': 3,
        'image': 'https://placehold.co/200x200?textphoot',
        'phoneNumber': '555-555-5555',
        'userName': 'alice_jones',
      },
      {
        'email': 'bob@example.com',
        'id': 4,
        'image': 'https://placehold.co/200x200?textphoot',
        'phoneNumber': '444-444-4444',
        'userName': 'bob_brown',
      },
      {
        'email': 'charlie@example.com',
        'id': 5,
        'image': 'https://placehold.co/200x200?textphoot',
        'phoneNumber': '333-333-3333',
        'userName': 'charlie_white',
      },
    ],
)
</script>

<template>
  <VContainer
    class="fill-height"
    fluid
  >
    <VRow justify="center" align="center">
      <VCol cols="8">
    <VList max-height="500px">

      <VListItem

        v-for="user in users"
        :key="user.id"
        class="bg-grey-lighten-4 my-4 pa-2 rounded-lg"
        :prepend-avatar="user.image"
      >
        <template v-slot:append>
          <v-btn
              color="grey-lighten-1"
              icon="mdi-square-rounded-badge-outline"
              @click="()=>useRouter().push({name:'chat',query:{'client':user.id}})"
              variant="text"
          ></v-btn>
        </template>
        <VListItemTitle class="text-h6 text-grey-darken-4">
          {{ user.userName }}
        </VListItemTitle>
        <VListItemSubtitle>
          {{ user.phoneNumber }}
        </VListItemSubtitle>
      </VListItem>
    </VList>
      </VCol>
    </VRow>
  </VContainer>
</template>