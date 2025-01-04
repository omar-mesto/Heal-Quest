<script setup lang="ts">
const navItems = [
  { title: 'Home', value: 'Home', icon: 'mdi-home', route: '/' },
  { title: 'Chat', value: 'Chat', icon: 'mdi-chat', route: '/chat' },
  { title: 'Plans', value: 'Plans', icon: 'mdi-calendar-check', route: '/plans' },
  { title: 'Policy', value: 'Policy', icon: 'mdi-file-document', route: '/policy' },
];
</script>

<template>
  <div>
    <VAppBar
      class="d-none d-sm-flex bg-primary"
      app
    >
      <VToolbarTitle>Logo</VToolbarTitle>
      <VSpacer />
      <div class="d-flex justify-center w-50">
        <VBtn 
          v-for="item in navItems" 
          :key="item.value" 
          @click="$router.push(item.route)"
        >
          <span>{{ item.title }}</span>
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
      <slot />
    </VAppBar>
    <VBottomNavigation
      class="d-flex d-sm-none bg-primary"
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

<style scoped>
</style>