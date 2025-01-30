import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";
import { ref } from "vue";
const isAdmin=ref("")
isAdmin.value=window?.localStorage.getItem("Role");
export default defineNuxtRouteMiddleware((to, from) => {
    console.log(to);
    if(to.name =="Dashboard-actors-doctors" && !isAdmin){
        return navigateTo('/Auth/Admin')
    }
})
