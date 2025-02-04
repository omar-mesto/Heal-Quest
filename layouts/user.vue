<script lang="ts" setup>
import { ref, watch } from 'vue'

import NavBar from '../shared/NavBar.vue'
const drawer = ref(true)
const items = [
  { icon: 'mdi-account', route: '/userProfile', title: 'Profile', value: 'profile' },
  { icon: 'mdi-bell', route: '/userProfile/notifications', title: 'Notifications', value: 'notification' },
  { icon: 'mdi-translate', route: '/userProfile', title: 'Language', value: 'language' },
  { icon: 'mdi-file-lock', route: '/userProfile/privacyPolicy', title: 'Privacy Policy', value: 'privacy-policy' },
  { icon: 'mdi-cog', route: '/userProfile/settings', title: 'Settings', value: 'settings' },
  { icon: 'mdi-help-circle', route: '/userProfile/help', title: 'Help', value: 'help' },
  { icon: 'mdi-logout', route: '/userProfile', title: 'Logout', value: 'logout' },
]
const group = ref(null)
watch(group, () => {
  drawer.value = false
})

const toggleDrawer = () => {
  drawer.value = !drawer.value
}

</script>

<template>
  <VApp>
    <NavBar>
      <VAppBarNavIcon
        variant="text"
        @click="toggleDrawer"
      />
    </NavBar>
    <VNavigationDrawer
      v-model="drawer"
      class="h-screen"
      app 
      permanent
    >
      <VList class="h-100">
        <VListItem class="profile-section">
          <div class="d-flex align-center">
              <VImg
                src="../public/default-image.png"
                width="100px"
              />
            <VListItemTitle class="mx-2 font-weight-bold">
              user name
            </VListItemTitle>
          </div>
        </VListItem>
        <VDivider />
        <VListItem
          v-for="item in items"
          :key="item.value"
          class="profile-section pt-5"
          @click="$router.push(`${item.route}`)"
        >
          <div class="d-flex align-center">
              <VIcon class="mr-2">
                {{ item.icon }}
              </VIcon>
            <VListItemTitle>{{ item.title }}</VListItemTitle>
          </div>
        </VListItem>
      </VList>
    </VNavigationDrawer>

    <VContainer
      class="container d-flex justify-center"
      fluid
    >
      <slot />
    </VContainer>
  </VApp>
</template>

  <style scoped>
  @media (max-width: 600px) {
  .v-navigation-drawer {
    justify-content: center !important;
    display: grid !important;
    top: 0 !important;
  }
  .v-app{
    top: 0 !important;
  }
  .container{
    margin: 0 auto !important;
    height: 100vh !important;
  }
}
.v-navigation-drawer {
  height: 100vh !important;
}
  </style>
