<script lang="ts" setup>
import PrimaryDialog from '@@/components/PrimaryDialog.vue';
import { useLogout } from '@@/queries/users';
import { useGlobalStore } from '@@/stores/global';
import { navigateTo } from 'nuxt/app';
import { ref, watch } from 'vue';
import NavBar from '../shared/NavBar.vue';
const drawer = ref(true)
const items = [
  { icon: 'mdi-account', route: '/userProfile/account', title: 'Profile', value: 'profile' },
  { icon: 'mdi-bell', route: '/notifications', title: 'Notifications', value: 'notification' },
  { icon: 'mdi-file-lock', route: '/aboutUs', title: 'About Us', value: 'privacy-policy' },
  { icon: 'mdi-file-lock', route: '/privacyPolicy', title: 'Privacy Policy', value: 'privacy-policy' }
]
const isLoading=ref(false);
const group = ref(null)
watch(group, () => {
  drawer.value = false
})

const toggleDrawer = () => {
  drawer.value = !drawer.value
}
const globalStore=useGlobalStore()
globalStore.lang='en'
const changeLanguage = () => {  
  globalStore.lang = (globalStore.lang === 'en') ? 'ar' : 'en';  
}; 

const logOutDialog=ref(false);
const logOut = async ()=>{
  isLoading.value=true;
  const { status } = await useLogout()
  globalStore.token=''
  globalStore.currentUser=''
  globalStore.role=null
  window?.localStorage.clear()
  if(status.value =='success' ){
    logOutDialog.value=false
    isLoading.value=false
    return navigateTo('/auth/user')
  }
}

</script>

<template>
  <NavBar>
    <VAppBarNavIcon
      variant="text"
      @click="toggleDrawer"
    />
    <VNavigationDrawer
      v-model="drawer"
      permanent
    >
      <VList class="h-100">
        <VListItem
          v-for="item in items"
          :key="item.value"
          class="profile-section my-2"
          @click="$router.push(`${item.route}`)"
        >
          <div class="d-flex align-center">
            <VIcon class="mr-2">
              {{ item.icon }}
            </VIcon>
            <VListItemTitle>{{ item.title }}</VListItemTitle>
          </div>
        </VListItem>
        <VListItem
          class="profile-section my-2"
          @click="changeLanguage()"
        >
          <div class="d-flex align-center">
            <VIcon class="mr-2">
              mdi-translate
            </VIcon>
            <VListItemTitle>{{ globalStore.lang }}</VListItemTitle>
          </div>
        </VListItem>
        <VListItem
          @click="logOutDialog=true"
          class="profile-section my-2"
        >
          <div class="d-flex align-center">
            <VIcon class="mr-2">
              mdi-logout
            </VIcon>
            <VListItemTitle>Logout</VListItemTitle>
          </div>
        </VListItem>
      
      </VList>
    </VNavigationDrawer>

    <slot />
  </NavBar>
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
</template>

<style scoped>
</style>
