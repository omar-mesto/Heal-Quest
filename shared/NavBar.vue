<script setup lang="ts">
import { useGlobalStore } from "@@/stores/global";
import { useRoute } from 'nuxt/app';
import { ref } from "vue";
import { VMain } from 'vuetify/components';
const globalStore=useGlobalStore();

const navItems = ref([
  { icon: 'mdi-home', route: '/', title: 'Home', value: 'Home' },
  { icon: 'mdi-chat', route: '/chat', title: 'Chat', value: 'Chat' },
  { icon: 'mdi-calendar-check', route: '/plans', title: 'Plans', value: 'Plans' },
  { icon: 'mdi-account', route: '/userProfile/account', title: 'Profile', value: 'Profile' },
  
])
if(globalStore.role=='Doctor')
  navItems.value=[
    { icon: 'mdi-chat', route: 'doctor/conversations', title: 'Conversations', value: 'Conversations' },
    { icon: 'mdi-account', route: '/doctor', title: 'Profile', value: 'Profile' },
  ]
if(globalStore.role=='Client'){
  navItems.value[1]={ icon: 'mdi-chat', route: {path:'/chat',query:{id:'JOAl3NgwgE',name:'Doctor'}}, title: 'Chat', value: 'Chat' }
}


</script>

<template>
  <div>
    <VAppBar
      v-if="!$vuetify.display.mobile"
      class="bg-primary px-4 "
    >
      <VToolbarTitle>Logo</VToolbarTitle>
      <div class="d-flex justify-center w-50">
        <VBtn
          v-for="item in navItems"
          :key="item.value"
          class="mx-2"
          :class="{'bg-blue':useRoute().fullPath==item.route}"
          @click="$router.push(item.route)"
        >
          <span class="font-weight-bold">{{ item.title }}</span>
        </VBtn>
      </div>
      <VSpacer />
      <VBtn icon>
        <VIcon>mdi-heart</VIcon>
      </VBtn>
      <VBtn
        icon
        @click="$router.push('/userProfile')"
      >
        <VIcon>mdi-account</VIcon>
      </VBtn>
    </VAppBar>

    <VMain>
      <slot />
    </VMain>
    <VBottomNavigation
      v-if="$vuetify.display.mobile"
      class="bg-primary"
      app
    >
      <VBtn
        v-for="item in navItems"
        :key="item.value"
        @click="$router.push(item.route)"
      >
        <VIcon>{{ item.icon }}</VIcon>
        <span>{{ item.title }}</span>
      </VBtn>
    </VBottomNavigation>
  </div>
</template>