<script setup lang="ts">

import {useRoute} from "nuxt/app";
import Snackbar from "@@/shared/Snackbar.vue";
import {useGlobalStore} from "@@/stores/global";
import {ref} from "vue";

const route = useRoute()
const globalStore=useGlobalStore();

</script>

<template>
  <div>
        <Snackbar v-if="globalStore.error" :message="globalStore.error" />
    <VApp>
      <NuxtLayout>
        <NuxtPage keepalive  :page-key="route => route.fullPath"/>
      </NuxtLayout>
    </VApp>
  </div>
</template>

<style>

.v-application__wrap {  min-height: 100dvh !important; }
</style>