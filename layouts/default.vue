<script setup>
import Footer from '@/shared/Footer.vue'
import NavBar from '@/shared/NavBar.vue'

</script>

<template>
  <VApp>
    <NavBar>
      <slot />
    </NavBar>
    <Footer />
  </VApp>
</template>
