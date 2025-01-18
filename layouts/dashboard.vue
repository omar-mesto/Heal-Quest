<script lang="ts" setup generic="T">  
import { useRoute } from 'nuxt/app';
import { computed, ref, watch } from 'vue';
const emit = defineEmits(['save','update']);
const drawer = ref(true); 
const dialog = ref(false); 
const dialogDelete = ref(false);  
const editedIndex = ref(-1);
const page=ref(1)
const router=useRoute()

//side Bar
const items = ref([  
  { title: 'Actors',id:1,
    subitems:[
      { title:'Users',route:'/' },
      { title:'Doctors',route:'/dashboard/Actors/doctors' },
    ],
  },  
  { title: 'Actors2',id:2,
    subitems:[
      { title:'Users2',route:'/'  },
      { title:'Doctors2',route:'/'  },
    ],
  },  
  { title: 'Actors3',id:3,
    subitems:[
      { title:'Users3',route:'/'  },
      { title:'Doctors3',route:'/'  },
    ],
  },  
]); 
const toggleDrawer = () => {  
  drawer.value = !drawer.value;  
};  
defineProps<{
  headers: { title: string, align: string, sortable: boolean, key: string }[]  ,
  data: T[],
  disable:boolean,
  loading:boolean,
  tableName: string
}>();

const formTitle = computed(() => 
  (editedIndex.value === -1 ? 'New' : 'Edit'),
);

watch(dialog, (val) => {  
  if (!val) close();  
});  

watch(dialogDelete, (val) => {  
  if (!val) closeDelete();  
})

const close = () => {  
  dialog.value = false;   
  editedIndex.value = -1;  
}; 
const closeDelete = () => {  
  dialogDelete.value = false;  
};  

const save = () => {  
  if (editedIndex.value > -1) {  
    emit('update');
  } else {  
    
    emit('save');
  }  
  close();  
};  

const deleteItem = () => {  
  dialogDelete.value = true;  
};  

const deleteItemConfirm = () => {  
  if (editedIndex.value > -1) {  
    console.log('test')
  }  
  closeDelete();  
};  

const blockItem = (item:string) => {  
  dialogDelete.value = true;
  console.log(`Blocking item: ${item}`);  
};  

</script>  

<template>  
  <VApp>  
    <VNavigationDrawer  
      v-model="drawer"
      permanent
    >  
      <div class="text-center">
        <VAvatar
          size="100px"
          class="mt-3"
        >
          <VImg src="../public/admin.png" />
        </VAvatar>
        <VList>  
          <VListItem 
            title="Adam" 
          />
        </VList>  
      </div>
      <VList
        density="compact"
        nav
      >  
        <VListGroup
          v-for="item in items"
          :key="item.title"
          :value="item.id"
        >
          <template #activator="{ props }">
            <VListItem
              :title="item.title"
              v-bind="props"
            />
          </template>
          <VListItem
            v-for="subitem in item.subitems"
            :key="subitem.route"  
            class="listItem"
            :title="subitem.title"
            :class="{'border-s-lg border-primary':subitem.route===router.fullPath}"
            @click="$router.push(`${subitem.route}`)"
          />
        </VListGroup>
      </VList>
    </VNavigationDrawer> 
   
    <VMain>  
      <VToolbar
        class="bg-white"
        elevation="2"
      >  
        <VToolbarTitle>Good Morning, Adam!</VToolbarTitle>  
        <VSpacer />  
        <VBtn
          icon
          @click="toggleDrawer"
        >
          <VIcon>{{ drawer ? 'mdi-menu-open' : 'mdi-menu' }}</VIcon>  
        </VBtn>  
        <VBtn icon>  
          <VIcon>mdi-account-circle</VIcon>  
        </VBtn>  
      </VToolbar>  
      <VDivider />  
      <VContainer
        fluid
      >  
        <VCard
          class="mt-5"
        >
          <VDataTable
            v-show="useRoute().fullPath!='/dashboard'"
            elevation="7"
            :headers="headers"
            :items="data"
            :loading="loading"
            density="compact"
          >
            <template #top>
              <VToolbar
                flat
              >
                <VToolbarTitle class="text-subtitle-1">
                  {{ tableName }}
                </VToolbarTitle>
                
                <VDialog
                  v-model="dialog"
                  max-width="500px"
                >
                  <template #activator="{ props }">
                    <VBtn
                      class="mb-2 w-40"
                      color="primary"
                      dark
                      v-bind="props"
                    >
                      + New
                    </VBtn>
                  </template>
                  <VCard>
                    <VCardTitle>
                      <span class="text-h5">{{ formTitle }}</span>
                    </VCardTitle>

                    <VCardText>
                      <VContainer>
                        <slot name="newItem" />
                      </VContainer>
                    </VCardText>

                    <VCardActions>
                      <VSpacer />
                      <VBtn
                        color="blue-darken-1"
                        variant="text"
                        @click="close"
                      >
                        Cancel
                      </VBtn>
                      <VBtn
                        color="blue-darken-1"
                        variant="text"
                        :disabled="disable"
                        @click="save" 
                      >
                        Save
                      </VBtn>
                    </VCardActions>
                  </VCard>
                </VDialog>
              </vtoolbar>
              <VDialog
                v-model="dialogDelete"
                max-width="500px"
              >
                <VCard>
                  <VCardTitle class="text-h5">
                    Are you sure you want to contenue this jop?
                  </VCardTitle>
                  <VCardActions>
                    <VSpacer />
                    <VBtn
                      color="blue-darken-1"
                      variant="text"
                      @click="closeDelete"
                    >
                      Cancel
                    </VBtn>
                    <VBtn
                      color="blue-darken-1"
                      variant="text"
                      @click="deleteItemConfirm"
                    >
                      OK
                    </VBtn>
                    <VSpacer />
                  </VCardActions>
                </VCard>
              </VDialog>
            </template>
      
            <template #item.actions="{ item }">
              <slot />
              <VIcon
                size="25"
                @click="deleteItem(item)"
              >
                mdi-delete
              </VIcon>
            </template>

            <template #item.image.image="{ item }">
              <VCard
                class="my-2 rounded-circle"
                width="80"
                height="80"
                elevation="2"
                rounded
              >
                <VImg
                  :src="`${item.image.image}`"
                  width="80"
                  height="80"
                  cover
                />
              </VCard>
            </template>

            <template #bottom>
              <div class="text-center pt-2">
                <VPagination
                  v-model="page"
                />
              </div>
            </template>
          </VDataTable>  
        </VCard>  
      </VContainer>  
    </VMain>  
  </VApp>  
</template>

<style scoped lang="scss">
.v-list--nav {
  padding-inline: 0px !important;
}
</style>