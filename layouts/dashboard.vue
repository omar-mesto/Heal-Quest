<script lang="ts" setup>  
import { computed, ref, watch } from 'vue';

const drawer = ref(true); 
const items = ref([  
  { title: 'Actors', icon: 'mdi-folder',rout:'/dashboard',
    subitems:[
      { title:'Users' },
      { title:'Doctors' },
    ],
  },  
  { title: 'Actors2', icon: 'mdi-folder',rout:'/dashboard',
    subitems:[
      { title:'Users' },
      { title:'Doctors' },
    ],
  },  
  { title: 'Actors3', icon: 'mdi-folder',rout:'/dashboard',
    subitems:[
      { title:'Users' },
      { title:'Doctors' },
    ],
  },  
]); 

 
const toggleDrawer = () => {  
  drawer.value = !drawer.value;  
};  


const props = defineProps<{
  headers: string[];
  data: string[];
  tableName: string;
  prevStep?: () => void;
  nextStep?: () => void;
}>();

const dialog = ref(false); 
const formTitle = computed(() => (editedIndex.value === -1 ? 'New Item' : 'Edit Item')); 
const dialogDelete = ref(false);  
const editedIndex = ref(-1);   

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
    // Edit the existing item   
  } else {  
    // Add a new item  
  }  
  close();  
};  

const deleteItem = () => {  
  // editedIndex.value = data?.value.indexOf(item);  
  dialogDelete.value = true; // Open delete confirmation dialog  
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
      app  
      permanent  
    >  
      <VLayout class="h-screen">  
        <VNavigationDrawer
          absolute
          permanent
          class="border"
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
              value="Actors"
              class="inverted-border-radius"
            >
              <template #activator="{ props }">
                <VListItem  
                  
                  title="Actors"
                  v-bind="props"
                />
              </template>
              <VListItem
                v-for="(item, i) in items[0].subitems"
                :key="i"  
                class="listItem"
                :title="item.title"
              />
            </VListGroup>
            <VListGroup
              value="items"
            >
              <template #activator="{ props }">
                <VListItem  
                  
                  title="Actors"
                  v-bind="props"
                />
              </template>
              <VListItem
                v-for="(item, i) in items[0].subitems"  
                :key="i"
                :title="item.title"
              />
            </VListGroup>
            <VListGroup
              value="items2"
            >
              <template #activator="{ props }">
                <VListItem  
                  
                  title="Actors"
                  v-bind="props"
                />
              </template>
              <VListItem
                v-for="(item, i) in items[0].subitems"  
                :key="i"
                :title="item.title"
              />
            </VListGroup>
          </VList>
        </VNavigationDrawer>
      </VLayout>  
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
          class="mt-5 bg-light-blue-lighten-5"
          elevation="7"
        >  
          <VDataTable
            :headers="props.headers"
            :items="props.data"
            density="compact"
          >
            <template #top>
              <VToolbar
                flat
              >
                <VToolbarTitle>{{ props.tableName }}</VToolbarTitle>
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
                      <VContainer />
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
              <VIcon
                class="me-2"
                size="20"
                @click="blockItem(item)"
              >
                mdi-block-helper
              </VIcon>
              <VIcon
                size="25"
                @click="deleteItem(item)"
              >
                mdi-delete
              </VIcon>
            </template>

            <template #item.image.image="{ item }">
              <VCard
                class="my-2"
                elevation="2"
                rounded
              >
                <VImg
                  :src="`${item.image.image}`"
                  height="100"
                  width="100"
                  cover
                />
              </VCard>
            </template>
          </VDataTable>  
        </VCard>  
      </VContainer>  
    </VMain>  
  </VApp>  
</template>

<style scoped lang="scss">
.border{
  border-left:solid 10px #2260FF !important;
}
.v-list--nav {
  padding-inline: 0px !important;
}
.inverted-border-radius{
  position: relative;
  background-color: #2260FF;
  color: #fff;
  border-radius: 25px 25px 25px 0;
}

.inverted-border-radius::before {
  content: "";
  position: relative;
  
  background-color: transparent;
  bottom: -50px;
  height: 50px;
  width: 25px;
  border-top-left-radius: 25px;
  box-shadow: 0 -25px 0 0 #2260FF;
}
.listItem{
  background-color: #fff !important;
  margin-bottom: 0 !important;
  color: #000000ED !important;
  border-radius: 0 !important;
}
</style>