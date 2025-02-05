import { RoleName } from "@@/utils/RoleName";
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGlobalStore = defineStore('globalStore', () => {
    const token = ref('')
    const currentUser = ref()
    const errors = ref<object>()
    const role=ref<RoleName>();

return { currentUser,role, errors, token }
},  {
    persist: {
        pick: ['token','role','errors','currentUser'],
    },
},)