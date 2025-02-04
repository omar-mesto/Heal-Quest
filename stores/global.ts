import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGlobalStore = defineStore('globalStore', () => {
    const token = ref('')
    const currentUser = ref()
    const errors = ref()

return { currentUser, errors, token }
},  {
    persist: {
        pick: ['token', 'currentUser'],
    },
},)