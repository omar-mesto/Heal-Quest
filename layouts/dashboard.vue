<script lang="ts" setup generic="T">
import { useLogout } from '@@/queries/users';
import { useGlobalStore } from '@@/stores/global';
import { navigateTo, useRoute } from 'nuxt/app';
import { ref } from 'vue';
const emit = defineEmits(['viewPlaceImages','save', 'update','viewCreateDialog','deleteItem','deleteThisItem'])
const drawer = ref(true)
const currentRoute = useRoute()
const items = ref([
  { id: 1, subitems: [
      { route: '/dashboard/actors/users', title: 'Users',icon:'mdi-account-multiple-outline' },
      { route: '/dashboard/actors/doctors', title: 'Doctors' ,icon:'mdi-doctor'},
    ],
    title: 'Actors',
    icon:'mdi-account-group-outline',
  },
  { id: 2, subitems: [
      { route: '/dashboard/home/categories', title: 'Disease Categories', icon:'mdi-format-list-bulleted-type' },
      { route: '/dashboard/home/advertisement', title: 'Advertisements', icon:'mdi-advertisements' },
    ],
    title: 'Home',
    icon:'mdi-home-outline',
  },
  { id: 3, subitems: [
      { route: '/dashboard/other/placeService', title: 'Place Service' },
      { route: '/dashboard/other/service', title: 'Service',icon:'mdi-home-group-plus' },
      { route: '/dashboard/other/place', title: 'Place',icon:'mdi-home-group-plus' },
    ],
    title: 'Other',
    icon:'mdi-shape-outline',
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
    return navigateTo('/auth/admin')
  }
  isLoading.value=false
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
          size="120px"
          class="mt-3"
        >
          <VImg  min-width="100px"  src="../public/default-image.png" >
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <VProgressCircular
                    color="grey-lighten-4"
                    indeterminate
                ></VProgressCircular>
              </div>
            </template>
          </VImg>
        </VAvatar>
        <VList>
          <VListItem class="text-h6 font-weight-bold">
          {{globalStore.currentUser.userName}}
          </VListItem>
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
              v-bind="props"
            >
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>
            <VListItemTitle class="text-body-1 font-weight-medium text-grey-darken-3">{{ item.title}}</VListItemTitle>
          </VListItem>
          </template>

          <VListItem
            v-for="subitem in item.subitems"
            :key="subitem.route"
          class="text-start"
            :class="{'border-s-xl rounded-0 border-primary':subitem.route===currentRoute.fullPath}"
            @click=" ()=>  navigateTo({path:subitem.route})"
          >
            <template v-slot:prepend>
              <v-icon :icon="subitem.icon"></v-icon>
            </template>
            <VListItemTitle class="text-body-2">
              {{subitem.title}}
            </VListItemTitle>
          </VListItem>

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
            v-show="currentRoute.fullPath!='/Dashboard'"
            elevation="7"
            :headers="headers"
            :items="data"
            height="600"
            density="compact"
            class="text-body-1 font-weight-medium"
          >
            <template #top>
              <VToolbar
                flat
              >
                <VToolbarTitle class="text-h6">
                  {{ tableName }}
                </VToolbarTitle>
                  <VBtn
                      :disabled="useRoute().name==='Dashboard-actors-users'"
                      style="font-size: 24px;"
                      icon
                      variant="outlined"
                      class="bg-white"
                      @click="$emit('viewCreateDialog')"
                  >
                    <VIcon  icon="mdi-plus" color="primary"></VIcon>
                  </VBtn>
              </vtoolbar>

            </template>


            <template #item.placeContact.facebook="{item}">
              <div>
                <VBtn class="mx-auto text-center" base-color="primary" size="small" icon="mdi-facebook" target="_blank" :href="item.placeContact?.facebook" />
              </div>

            </template>
            <template #item.placeContact.instagram="{item}">
              <div>
                <VBtn base-color="red-lighten-1" size="small" icon="mdi-instagram" target="_blank" :href="item.placeContact?.instagram" />
              </div>

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
                  class="rounded-circle mx-auto my-2"
                />
            </template>
            <template #item.images[0].data="{ item }">
                <VImg
                  :src="item.images[0].data"
                  lazy-src="/default-image.png"
                  width="80"
                  height="80"
                  cover
                  class="rounded-circle mx-auto my-2"
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
                  class="rounded-circle mx-auto my-2"
                />
            </template>
          <template #item.viewImages="{item}">
            <div class="my-2">
              <VBtn @click="$emit('viewPlaceImages',item)" prepend-icon="mdi-image-multiple-outline" variant="outlined" base-color="primary"  class="text-none">View images</VBtn>
            </div>
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