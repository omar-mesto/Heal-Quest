<script lang="ts" setup>
import { ref, watch } from 'vue';
import NavBar from '../shared/NavBar.vue';
const drawer = ref(true);
const items = [
  { title: 'Profile', value: 'profile', icon: 'mdi-account',route:'/userProfile' },
  { title: 'Notifications', value: 'notification', icon: 'mdi-bell',route:'/userProfile/notifications' },
  { title: 'Language', value: 'language', icon: 'mdi-translate',route:'/userProfile' },
  { title: 'Privacy Policy', value: 'privacy-policy', icon: 'mdi-file-lock',route:'/userProfile/privacyPolicy' },
  { title: 'Settings', value: 'settings', icon: 'mdi-cog',route:'/userProfile/settings' },
  { title: 'Help', value: 'help', icon: 'mdi-help-circle',route:'/userProfile/help' },
  { title: 'Logout', value: 'logout', icon: 'mdi-logout',route:'/userProfile' },
];
const group = ref(null);
watch(group, () => {
  drawer.value = false;
});
  
const toggleDrawer = () => {
  drawer.value = !drawer.value;
};
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
      class="h-100"
      app
      permanent
    >
      <VList class="h-100">
        <VListItem class="profile-section">
          <div class="d-flex align-center">
            <VListItemAvatar>
              <VImg
                src="../public/userImage.png"
                width="100px"
              />
            </VListItemAvatar>
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
            <VListItemIcon>
              <VIcon class="mr-2">
                {{ item.icon }}
              </VIcon>
            </VListItemIcon>
            <VListItemTitle>{{ item.title }}</VListItemTitle>
          </div>
        </VListItem>
      </VList>
    </VNavigationDrawer>
  
    <VMain>
      <VContainer
        class="h-100"
        fluid
      >
        <slot />
      </VContainer>
    </VMain>
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
}
  </style>