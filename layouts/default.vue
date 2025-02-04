<script setup>
import Footer from '@/shared/Footer.vue'
import NavBar from '@@/shared/NavBar.vue'

</script>

<template>
    <NavBar>
      <VContainer
        fluid
        class="pt-0"
      >
        <slot />  
      </VContainer>
    </NavBar>
    <Footer />
</template>
