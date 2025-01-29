<script lang="ts" setup generic="T">
import PrimaryDialog from '@@/components/PrimaryDialog.vue';
import { DoctorsModel } from '@@/models/doctorsModel';
import { useRoute } from 'nuxt/app';
import { ref } from 'vue';
const emit = defineEmits(['save', 'update','viewCreateDialog'])
const drawer = ref(true)
const dialogDelete = ref(false)
const page = ref(1)
const router = useRoute()

// side Bar
const items = ref([
  { id: 1, subitems: [
      { route: '/', title: 'Users' },
      { route: '/dashboard/Actors/doctors', title: 'Doctors' },
    ],
    title: 'Actors',
  },
  { id: 2, subitems: [
      { route: '/', title: 'Users2' },
      { route: '/', title: 'Doctors2' },
    ],
    title: 'Actors2',
  },
  { id: 3, subitems: [
      { route: '/', title: 'Users3' },
      { route: '/', title: 'Doctors3' },
    ],
    title: 'Actors3',
  },
])
const toggleDrawer = () => {
  drawer.value = !drawer.value
}
const props = defineProps<{
  data: [],
  disable: boolean,
  loading: boolean,
  headers: { align: string, key: string, sortable: boolean, title: string }[],
  tableName: string
  dialogHeaderTitle?:string
}>()
const currentDoctor=ref<DoctorsModel>();

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
            v-show="useRoute().fullPath!='/dashboard'"
            elevation="7"
            :headers="headers"
            :items="data"
            :loading="loading"
            density="compact"
          >
            <template #top>
              <VToolbar
                flat
              >
                <VToolbarTitle class="text-h6">
                  {{ tableName }}
                </VToolbarTitle>
<VBtn  style="font-size: 24px;" icon="mdi-plus" color="primary" @click="$emit('viewCreateDialog')" />
     
              </vtoolbar>
     
            </template>

            <template #item.actions="{ item }">
              <slot />
              <VIcon
                size="35"
                @click="()=>{currentDoctor=item; dialogDelete=true}"
              >
                mdi-delete-outline
              </VIcon>
            </template>

            <template #item.image.image="{ item }">
              <VCard
                class="my-2 rounded-circle"
                width="80"
                height="80"
                elevation="2"
                rounded
              >
                <VImg
                  :src="`${item?.image?.image}`"
                  width="80"
                  height="80"
                  cover
                />
              </VCard>
            </template>

            <template #bottom>
              <div class="text-center pt-2">
                <VPagination
                  v-model="page"
                />
              </div>
            </template>
          </VDataTable>
        </VCard>
      </VContainer>
    </VMain>
    <PrimaryDialog icon="mdi-account-cancel-outline" @close="dialogDelete=false" v-model="dialogDelete" title="Delete">
<VForm @submit.prevent="deleteDoctor()">

      <p class="text-h6">Are you sure, you want to delete <span class="font-weight-bold">{{ currentDoctor.fullName }}</span>  doctor </p>
      <VCardActions class="mt-4">
        <VSpacer></VSpacer>
        <VBtn
                        color="grey-darken-3"
                        @click="dialogDelete=false"
                      >
                        Cancel
                      </VBtn>
                      <VBtn
                      elevation="0"
                        color="error"
                       type="submit"
                       variant="elevated"
                       
                      >
                        Save
                      </VBtn>
      </VCardActions>
</VForm>

    </PrimaryDialog>

  </VApp>
</template>

<style scoped lang="scss">
.v-list--nav {
  padding-inline: 0px !important;
}
</style>
