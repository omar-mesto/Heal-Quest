<template>
  <span class="nav-link lang fs-5" style="cursor: pointer" @click="changeLanuage">
    {{ $i18n.locale == "en" ? "AR" : "EN" }}
  </span>
</template>

<script setup lang="ts">
const changeLanuage = () => {
  const lang = localStorage.getItem("lang");
  if (lang == null) {
    localStorage.setItem("lang", "ar");
    useLang().value = "ar";
  } else if (lang == "ar") {
    localStorage.setItem("lang", "en");
    useLang().value = "en";
  } else {
    localStorage.setItem("lang", "ar");
    useLang().value = "ar";
  }
  console.log('useLang().value')
  console.log(useLang().value)
  window.location.reload(true);
};
</script>

<style lang="scss" scoped></style>