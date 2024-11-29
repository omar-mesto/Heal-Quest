<template>
  <v-app-bar class="bg-primary" app>
    <v-toolbar-title>Logo</v-toolbar-title>
    <v-spacer></v-spacer>
    <div class="d-flex justify-center w-50">
      <v-btn v-for="item in navItems" :key="item" class="mx-2" variant="text">{{ item }}</v-btn>
    </div>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-account</v-icon>
    </v-btn>
    <slot/>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const navItems = ref(['Home', 'Chat', 'Plans', 'Policy']);
</script>