<template>
  <div>
    <v-window v-model="window" show-arrows class="mt-14">  
        <v-window-item  
          v-for="n in length"  
          :key="n"  
        >  
          <v-card class="d-flex justify-center align-center" height="400px"
          :style="{ backgroundImage: 'url(/homaSlider.png)', backgroundSize: 'cover', backgroundPosition: 'center' }"  >  
            <div class="text-center">  
              <h1 class="display-2 font-weight-bold mb-2">Experience the beauty of Rwanda with us</h1>  
              <h3 class="font-weight-light">Discover the Land of a Thousand Hills</h3>  
            </div>  
          </v-card>  
        </v-window-item>  
      </v-window>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const length = ref(3);  
const window = ref(0);
</script>

<style>

</style>