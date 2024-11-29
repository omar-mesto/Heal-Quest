<script setup>
import Footer from '~~/shared/Footer.vue';
import NavBar from '~~/shared/NavBar.vue';
</script>

<template>
  <v-app>
    <NavBar/>
    <slot />  
    <Footer />
  </v-app>
</template>
