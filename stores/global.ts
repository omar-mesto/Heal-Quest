import { RoleName } from "@@/utils/RoleName";
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGlobalStore = defineStore('globalStore', () => {
    const token = ref('')
    const lang=ref('en')
    const currentUser = ref()
    const error = ref<string>()
    const role=ref<RoleName>();

    const logout=()=>{
        token.value='';
        currentUser.value='';
        role.value=undefined;
        router.push({path:'/Auth/user'})
    }
return { currentUser,role,logout, error, token,lang }
},  {
    persist: {
        pick: ['token','role','error','currentUser','lang'],
    },
},)