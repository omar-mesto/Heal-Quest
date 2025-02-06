<script lang="ts" setup generic="T">
import { useLogout } from '@@/queries/users';
import { useGlobalStore } from '@@/stores/global';
import { navigateTo, useRoute } from 'nuxt/app';
import { ref } from 'vue';
const emit = defineEmits(['save', 'update','viewCreateDialog','deleteItem','deleteThisItem'])
const drawer = ref(true)
const router = useRoute()
const items = ref([
  { id: 1, subitems: [
      { route: '/dashboard/actors/users', title: 'Users' },
      { route: '/dashboard/actors/doctors', title: 'Doctors' },
    ],
    title: 'Actors',
  },
  { id: 2, subitems: [
      { route: '/dashboard/home/categories', title: 'Disease Categories' },
      { route: '/dashboard/home/advertisement', title: 'Advertisments' },
    ],
    title: 'Home',
  },
  { id: 3, subitems: [
      { route: '/dashboard/other/place', title: 'Place' },
      { route: '/dashboard/other/advertisement', title: 'Category With Place' },
    ],
    title: 'Other',
  },
])
const toggleDrawer = () => {
  drawer.value = !drawer.value
}
defineProps<{
  data: []|undefined,
  headers: { align: string, key: string, sortable: boolean, title: string }[],
  tableName: string
  dialogHeaderTitle?:string
  icon?: string
}>()

const route=useRoute()

function deleteThisItem(itemId) {
  emit('deleteThisItem', itemId);
}
const logOutDialog=ref(false);
const globalStore=useGlobalStore()
const isLoading=ref(false);
const logOut = async ()=>{
  isLoading.value=true;
  const { status } = await useLogout()
  globalStore.logout();
  if(status.value =='success' ){
    logOutDialog.value=false
    isLoading.value=false
    return navigateTo('/auth/admin')
  }
}
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
          <VImg src="../public/default-image.png" />
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
        <VToolbarTitle>Good Morning</VToolbarTitle>
        <VSpacer />
        <VBtn
          icon
          @click="toggleDrawer"
        >
          <VIcon>{{ drawer ? 'mdi-menu-open' : 'mdi-menu' }}</VIcon>
        </VBtn>
        <v-menu
      open-on-hover
    >
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
        >
        <VIcon size="25px">mdi-account-circle</VIcon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item >
          <v-list-item-title class="cursor-pointer d-flex align-center" @click="$router.push('/Dashboard')">
            <VIcon>mdi-account-circle-outline</VIcon> <p class="ms-2 text-grey-darken-3" >Profile</p>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title class="cursor-pointer d-flex align-center" @click="logOutDialog=true">
            <VIcon>mdi-logout</VIcon> <p class="ms-2 text-grey-darken-3" >Logout</p>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
      </VToolbar>
      <VDivider />
      <VContainer
        fluid
      >
        <VCard
          class="mt-5"
        >
        <!-- todo:get current route -->
          <VDataTable
            v-show="route.fullPath!='/Dashboard'"
            elevation="7"
            :headers="headers"
            :items="data"
            height="400"
            density="compact"
          >
            <template #top>
              <VToolbar
                flat
              >
                <VToolbarTitle class="text-h6">
                  {{ tableName }}
                </VToolbarTitle>
                  <VBtn :disabled="useRoute().name==='Dashboard-actors-users'" style="font-size: 24px;" icon="mdi-plus" color="primary" @click="$emit('viewCreateDialog')" />
              </vtoolbar>

            </template>

            <template #item.actions="{ item }">
              <slot />
              <VIcon
                size="35"
                @click="deleteThisItem(item)"
              >
                {{ icon ? icon : 'mdi-delete-outline' }}
              </VIcon>

            </template>

            <template #item.image.image="{ item }">
                <VImg
                  :src="item?.image?.image"
                  lazy-src="/default-image.png"
                  width="80"
                  height="80"
                  cover
                  class="rounded-circle my-2"
                />
            </template>
            <template #item.images[0].data="{ item }">
                <VImg
                  :src="item.images[0].data"
                  lazy-src="/default-image.png"
                  width="80"
                  height="80"
                  cover
                  class="rounded-circle my-2"
                />
            </template>
            <template #item.image.url="{ item }">
                <VImg
                  :src="item?.image?.url"
                  lazy-src="/default-image.png"
                  width="80"
                  height="80"
                  cover
                  class="rounded-circle my-2"
                />
            </template>
            <template #item.icon="{ item }">
                <VImg
                  :src="item?.icon"
                  lazy-src="/default-image.png"
                  width="80"
                  height="80"
                  cover
                  class="rounded-circle my-2"
                />
            </template>

            <template #bottom>
              <div class="text-center pt-2">
                <slot name="pagination"/>
              </div>
            </template>


          </VDataTable>
        </VCard>
      </VContainer>
    </VMain>
    <PrimaryDialog v-model="logOutDialog" icon="mdi-logout" title="LogOut" @close="logOutDialog=false">
      <p class="text-h6 text-center">Are you sure, you want to <span class="font-weight-bold">Logout</span></p>
      <VCardActions class="mt-4">
          <VSpacer></VSpacer>
          <VBtn
            color="grey-darken-3"
            @click="logOutDialog=false"
          >
            Cancel
          </VBtn>
          <VBtn
            elevation="0"
            color="error"
            variant="elevated"
            :loading="isLoading"
            :disabled="isLoading"
            @click="logOut" 
         
          >
            Yes
          </VBtn>
        </VCardActions>
  </PrimaryDialog>

  </VApp>
</template>

<style scoped lang="scss">
.v-list--nav {
  padding-inline: 0 !important;
}
</style>