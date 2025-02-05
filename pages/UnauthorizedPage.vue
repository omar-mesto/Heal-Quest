<script lang="ts" setup>
const onClickAction = async () => {
  return  navigateTo({path:'/'}) 
}
</script>
<template>
<div>
  <VContainer class="fill-height">
    <VRow>
      <VCol>
        <v-empty-state
            headline="Whoops, 404"
            title="Page not found"
            text="The page you were looking for does not exist"
            action-text="Go Back Home"
            @click:action="onClickAction"
        ></v-empty-state>
      </VCol>
    </VRow>
  </VContainer>
</div>
</template>