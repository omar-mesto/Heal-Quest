<script lang="ts" setup>
import { ref, watch } from 'vue'

import NavBar from '../shared/NavBar.vue'
const drawer = ref(true)
const items = [
  { icon: 'mdi-account', route: '/userProfile', title: 'Profile', value: 'profile' },
  { icon: 'mdi-bell', route: '/userProfile/notifications', title: 'Notifications', value: 'notification' },
  { icon: 'mdi-translate', route: '/userProfile', title: 'Language', value: 'language' },
  { icon: 'mdi-file-lock', route: '/userProfile/privacyPolicy', title: 'Privacy Policy', value: 'privacy-policy' },
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

    <slot />
  </NavBar>
</template>

<style scoped>
</style>
