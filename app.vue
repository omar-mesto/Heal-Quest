<script setup lang="ts">

import { useRoute } from "nuxt/app";

const route = useRoute()
</script>

<template>
  <div>
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