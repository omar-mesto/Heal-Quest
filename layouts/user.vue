<template>
    <v-app>
        <NavBar>
          <v-app-bar-nav-icon variant="text" @click="toggleDrawer"></v-app-bar-nav-icon>
        </NavBar>
        <v-navigation-drawer  class="h-100" 
        v-model="drawer" app>
        <v-list class="h-100">
          <v-list-item class="profile-section">
            <div class="d-flex align-center">
              <v-list-item-avatar>
                <v-img src="../public/userImage.png" width="100px" />
              </v-list-item-avatar>
              <v-list-item-title class="mx-2 font-weight-bold">user name</v-list-item-title>
            </div>
          </v-list-item>
          <v-divider></v-divider>
            <v-list-item
              v-for="item in items"
              :key="item.value"
              @click="$router.push(`${item.route}`)"
              class="profile-section pt-5"
            >
              <div class="d-flex align-center">
                <v-list-item-icon>
                  <v-icon class="mr-2">{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </div>
            </v-list-item>
        </v-list>
      </v-navigation-drawer>
  
      <v-main>
        <v-container class="h-100" fluid>
          <slot />
        </v-container>
      </v-main>
    </v-app>
  </template>
  
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