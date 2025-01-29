<script setup>
import Footer from '@/shared/Footer.vue';
import NavBar from '@@/shared/NavBar.vue';

</script>

<template>
    <NavBar>
      <slot />
    </NavBar>
    <Footer />
</template>
