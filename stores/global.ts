import { RoleName } from "@@/utils/RoleName";
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGlobalStore = defineStore('globalStore', () => {
    const token = ref('')
    const currentUser = ref()
    const error = ref<string>()
    const role=ref<RoleName>();

return { currentUser,role, error, token }
},  {
    persist: {
        pick: ['token','role','error','currentUser'],
    },
},)