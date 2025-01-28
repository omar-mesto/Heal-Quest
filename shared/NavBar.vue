<script setup lang="ts">
const navItems = [
  { icon: 'mdi-home', route: '/', title: 'Home', value: 'Home' },
  { icon: 'mdi-chat', route: '/chat', title: 'Chat', value: 'Chat' },
  { icon: 'mdi-calendar-check', route: '/plans', title: 'Plans', value: 'Plans' },
  { icon: 'mdi-account', route: '/userProfile/account', title: 'Profile', value: 'Profile' },
]
</script>

<template>
  <div>
    <VLayout>
      <VAppBar>
        <VToolbarTitle>Logo</VToolbarTitle>
        <VSpacer />
        <div class="d-flex justify-center w-50">
          <VBtn
            v-for="item in navItems"
            :key="item.value"
            @click="$router.push(item.route)"
          >
            <span>{{ item.title }}</span>
          </VBtn>
        </div>
        <VSpacer />
        <VBtn icon>
          <VIcon>mdi-heart</VIcon>
        </VBtn>
        <VBtn
          icon
          @click="$router.push('/userProfile')"
        >
          <VIcon>mdi-account</VIcon>
        </VBtn>
      </VAppBar>
      <VMain>
        <slot />
      </VMain>
    </VLayout>
  </div>
</template>
