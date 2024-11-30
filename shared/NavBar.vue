<template>
  <div>
    <v-app-bar class="d-none d-sm-flex bg-primary" app>
      <v-toolbar-title>Logo</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="d-flex justify-center w-50">
        <v-btn 
          v-for="item in navItems" 
          :key="item.value" 
          @click="$router.push(item.route)"
        >
          <span>{{ item.title }}</span>
        </v-btn>
      </div>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon @click="$router.push('/userProfile')">
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <slot/>
    </v-app-bar>
    <v-bottom-navigation class="d-flex d-sm-none bg-primary" app>
      <v-btn 
        v-for="item in navItems" 
        :key="item.value" 
        @click="$router.push(item.route)"
      >
        <v-icon>{{ item.icon }}</v-icon>
        <span>{{ item.title }}</span>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script setup lang="ts">
const navItems = [
  { title: 'Home', value: 'Home', icon: 'mdi-home', route: '/' },
  { title: 'Chat', value: 'Chat', icon: 'mdi-chat', route: '/chat' },
  { title: 'Plans', value: 'Plans', icon: 'mdi-calendar-check', route: '/plans' },
  { title: 'Policy', value: 'Policy', icon: 'mdi-file-document', route: '/policy' }
];
</script>

<style scoped>
</style>