  <template>
    <div>
      <v-row class="py-5">  
          <v-col  
            v-for="category in categoryStore.categories.slice(1,7)"  
            :key="category.id"  
            cols="6"  
            md="2"  
          >  
            <v-card class="mx-auto text-center h-100 cursor-pointer">  
              <v-avatar size="50">  
                <v-img :src="`${category.icon}`"/>  
              </v-avatar>  
              <v-card-text>  
                {{ category.name.en }}  
              </v-card-text>  
            </v-card>  
          </v-col>  
        </v-row>  
    </div>
  </template>

  <script lang="ts" setup>
  import { onMounted } from 'vue';
import { useCategoryStore } from '../../store/home/useCategoryStore';

  const categoryStore = useCategoryStore();  
  
  onMounted(() => {  
    categoryStore.fetchCategories();  
  }); 

  </script>

  <style>

  </style>