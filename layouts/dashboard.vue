<script lang="ts" setup>  
import { ref } from 'vue';

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
          <slot />
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