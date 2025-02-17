import { useGlobalStore } from "@@/stores/global";
import { RoleName } from "@@/utils/RoleName";
import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";

const availableRoutes=['index','PlaceServices','categoryPlaces','Auth-Admin','Auth-User','UnauthorizedPage']
const doctorRoutes=[...availableRoutes, 'doctor-conversations','chat','doctor'];

const clientRoutes=[...availableRoutes,"userProfile-account" ,"chat","notifications","aboutUs","privacyPolicy"];

export default defineNuxtRouteMiddleware((to, from) => {
    let {role,token}=useGlobalStore()

    if(token && to.name.toString().startsWith('Auth-')){
        return navigateTo({path: role==RoleName.Doctor ? '/dashboard/actors/doctors' :  role==RoleName.SuperAdmin ? '/Dashboard/Actors/Doctors' : '/' })
    }

    if(!token.length && !availableRoutes.find((name)=>name==to.name))
         return  navigateTo({name:'Auth-User'})

    if(role==RoleName.Doctor && !doctorRoutes.find((routeName)=>routeName==to.name)){
        return navigateTo({path:'/UnauthorizedPage'})
    }
    if(role===RoleName.Client && !clientRoutes.find((routeName)=>routeName==to.name) ){
        return navigateTo({path:'/UnauthorizedPage'})
    }

    return true
})
