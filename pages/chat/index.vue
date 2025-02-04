<script setup lang="ts">
import { MessageForm } from '@@/models/MessageForm'
import { db, sendMessage } from '@@/services/firebase'
import { DocumentChange, DocumentData, onSnapshot, orderBy, query } from '@firebase/firestore'
import { collection } from 'firebase/firestore'
import moment from 'moment'
import { onMounted, ref } from 'vue'
const currentUserId = ref('1')
const messages = ref<MessageForm[]>([])
const textMessage = ref('')
const sendMsg = () => {
  sendMessage({
    message: textMessage.value,
    receiverId: '2',
    senderId: currentUserId.value,
    sentAt: moment().toISOString(),
    type: 'txt',
  })
  textMessage.value = ''
}
function openStream() {
  onSnapshot(query(collection(db, 'app', `${currentUserId.value}_2`, 'messages'), orderBy('sentAt', 'desc')), (streamDoc: DocumentData) => {
    streamDoc.docChanges().reverse().forEach((change: DocumentChange<MessageForm>) => {
      messages.value = [...messages.value, change.doc.data()]
    })
  })
}
onMounted(() => openStream())
</script>

<template>
  <div>
    <VContainer
      class="pa-0 d-flex flex-column "
      fluid
    >
      <VCard
        width="100%"
        height="100%"
      >
        <VList
          style="z-index: 9999"
          class=" w-100 border-b-sm "
          elevation="4"
        >
          <VListItem>
            <div class="d-flex justify-space-between align-center">
              <div class="text-grey-darken-3">
                <p class="font-weight-bold">
                  UserName
                </p>
                <p>email@email.com</p>
              </div>
              <VBtn
                variant="text"
                icon="mdi-arrow-left"
              />
            </div>
          </VListItem>
        </VList>
        <div
          class="pa-4"
          style="
          height: 100dvh;
          max-height: calc(100dvh - 220px); overflow-y: auto; scrollbar-width: thin; scrollbar-color: rgba(34,96,255,0.75) #f2f2f2;"
        >
          <VRow
            v-if="messages.length==0"
            justify="end"
            align="end"
          >
            <VCol
              v-for="n in 10"
              :key="n"
              align-self="end"
              cols="12"
            >
              <VSkeletonLoader
                :class="{'ms-auto': n%2==0}"
                type="heading"
                width="350px"
                :loading="true"
              />
            </VCol>
          </VRow>
          <VList
            v-for="message in messages"
            :key="message.message"
            class="mt-3 d-flex bg-transparent "
            :class="{'justify-end':message.receiverId!==currentUserId}"
          >
            <VListItem
              max-width="300px"
              class="bg-grey-lighten-2"
              :class="[ message.receiverId==currentUserId ? 'rounded-e-lg rounded-s-md':'rounded-s-lg rounded-e-md']"
            >
              <p>{{ message.message }}</p>
              <VListItemSubtitle v-tooltip="moment(message.sentAt).format('Y-MM-DD HH:MM')">
                {{ moment(message.sentAt).fromNow() }}
              </VListItemSubtitle>
            </VListItem>
          </VList>
        </div>
      </VCard>
      <VTextField
        v-model="textMessage"
        variant="solo-filled"
        class="mt-3"
        label="Enter a message.."
        append-inner-icon="mdi-send"
        @click:append-inner="sendMsg()"
      />
    </VContainer>
  </div>
</template>

<style>
.v-skeleton-loader__heading {
  height: 60px !important;
  margin: 0 !important;
}
</style>