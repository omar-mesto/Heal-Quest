import {defineNuxtRouteMiddleware, navigateTo, useRouter} from "nuxt/app";
import {useGlobalStore} from "@@/stores/global";
import {RoleName} from "@@/utils/RoleName";
import {util} from "protobufjs";
import global = util.global;

const availableRoutes=['index','PlaceServices','categoryPlaces','Auth-Admin','Auth-User','UnauthorizedPage']
const doctorRoutes=[...availableRoutes, 'doctor-conversations','chat','doctor'];


export default defineNuxtRouteMiddleware((to, from) => {
    let {role,token}=useGlobalStore()

    if(token && to.name == 'Auth-Admin'){
        //todo navigate to index admin page
        return navigateTo({path: role==RoleName.Doctor ? '/doctor' : '/'})
    }

    if(!token.length && !availableRoutes.find((name)=>name==to.name))
         return  navigateTo({name:'Auth-Admin'})

    if(role==RoleName.Doctor && !doctorRoutes.find((routeName)=>routeName==to.name)){
        return navigateTo({path:'/UnauthorizedPage'})
    }

    return true
})