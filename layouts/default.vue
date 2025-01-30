<script setup>
import Footer from '@/shared/Footer.vue'
import NavBar from '@@/shared/NavBar.vue'

</script>

<template>
  <VContainer
    fluid
    class="pt-0"
  >
    <NavBar>
      <slot />
    </NavBar>
    <Footer />
  </VContainer>
</template>
