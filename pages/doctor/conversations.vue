<script setup lang="ts">

import {onMounted, ref} from 'vue'
import {useRouter} from "nuxt/app";
import { getDoctorRooms} from "@@/services/firebase";
import {useConversations} from "@@/queries/conversations";
import {useGlobalStore} from "@@/stores/global";
const globalStore = useGlobalStore();
const currentDoctorId = ref(globalStore.currentUser?.id);

const clientsId=ref<string[]>([]);
const {data,status,clear}=useConversations(clientsId.value)
clear()

onMounted(async ()=>{
  const rooms =  await getDoctorRooms(currentDoctorId.value);
  rooms.forEach((room:string)=>{
    clientsId.value.push(room.substring(room.indexOf("_")+1))
  })
})

</script>

<template>

  <VContainer
    class="fill-height"
    fluid
  >
    <p class="d-flex w-100 text-grey-darken-4 text-h5 font-weight-medium">Conversations</p>
    <VRow justify="center" align="center">
      <VCol cols="8">
      <VList max-height="600px">
          <VSkeletonLoader v-for="n in data?.result ? 0 : 5" class="my-4" type="list-item-avatar-two-line" />
          <VListItem

        v-for="user in data?.result"
        :key="user.id"
        class="bg-grey-lighten-4 my-4 pa-2 rounded-lg"
        :prepend-avatar="user?.image?.image"
      >
        <template v-slot:append>
          <v-btn
              color="grey-lighten-1"
              icon="mdi-square-rounded-badge-outline"
              @click="()=>useRouter().push({name:'chat',query:{'id':user.id,'name':user.userName}})"
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