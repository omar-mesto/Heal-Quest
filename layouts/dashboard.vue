<script lang="ts" setup generic="T">
import { useRoute } from 'nuxt/app';
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
      { route: '/', title: 'Category' },
      { route: '/', title: 'Doctors3' },
    ],
    title: 'Actors3',
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
          class="mt-5"
        >
          <VDataTable
            v-if="useRoute().fullPath!='/dashboard'"
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


  </VApp>
</template>

<style scoped lang="scss">
.v-list--nav {
  padding-inline: 0 !important;
}
</style>