<script setup>
import NavBar from '~~/shared/NavBar.vue'
import Footer from '~~/shared/Footer.vue'
</script>

<template>
  <div>
    <NavBar />
    <slot />
    <Footer />
  </div>
</template>
