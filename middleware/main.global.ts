import { useGlobalStore } from "@@/stores/global";
import { RoleName } from "@@/utils/RoleName";
import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";
import { util } from "protobufjs";
import global = util.global;

const availableRoutes=['index','PlaceServices','categoryPlaces','Auth-Admin','Auth-User','UnauthorizedPage']
const doctorRoutes=[...availableRoutes, 'doctor-conversations','chat','doctor'];


export default defineNuxtRouteMiddleware((to, from) => {

    console.log("ddd");
    console.log(to);
    let {role,token}=useGlobalStore()

    if(token && to.name.toString().startsWith('Auth-')){
        return navigateTo({path: role==RoleName.Doctor ? '/doctor' :  role==RoleName.SuperAdmin ? '/Dashboard/Actors/Doctors' : '/' })
    }

    if(!token.length && !availableRoutes.find((name)=>name==to.name))
         return  navigateTo({name:'Auth-User'})

    if(role==RoleName.Doctor && !doctorRoutes.find((routeName)=>routeName==to.name)){
        return navigateTo({path:'/UnauthorizedPage'})
    }

    return true
})