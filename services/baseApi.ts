import { useGlobalStore } from "@@/stores/global";
import { refreshNuxtData, useFetch, useRouter } from 'nuxt/app';
import { Ref } from "vue";

// const router=useRouter()
export function useAPI<T>(
options:{  url: string,
  payload?: object,
  queryKey: string,
  isLazy?:boolean
  params?:{skip:Ref<number>,limit:Ref<number>}
    type:('DELETE' | 'GET' | 'POST' | 'PUT')}
) {
  return useFetch(options.url, {
    $fetch: api,
    body: options.payload,
    params:{...options.params},
    method: options.type,
    watch: false,
    onResponse: async () => await refreshNuxtData(options.queryKey),
  })
}

export const api = $fetch.create({

  baseURL: 'https://hq.90-soft.com/api/functions/',
  onRequest({ error, options, request }) {
    const globalStore=useGlobalStore();
    globalStore.error='';
    options.headers.set('Content-Type', 'application/json')
    options.headers.set('X-Parse-Application-Id', 'appId')
    options.headers.set('X-Parse-REST-API-Key', 'restAPIKey')
  options.headers.set('X-Parse-Session-Token', useGlobalStore().token)
  },

  onResponseError: (error) => {
    const router=useRouter()
    const globalStore=useGlobalStore();
    if(error.response._data?.error=='Invalid session token'){
      globalStore.logout();
    }
    
    useGlobalStore().error=error.response._data?.error
  },
},
)