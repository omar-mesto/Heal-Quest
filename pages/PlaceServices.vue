<script lang="ts" setup>
import { useRoute } from 'nuxt/app';

const route = useRoute();
const queryId =route.query.id;
</script>

<style>

</style>
<template>
    <div>
      <p class="text-grey-darken-4 text-h6 text-sm-h5 font-weight-medium mt-8 mt-sm-12 mb-4">
        Services {{ queryId }}
      </p>
    </div>
</template>