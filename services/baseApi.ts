import { refreshNuxtData, useFetch } from "nuxt/app"

export function useAPI<T>(
  url: (() => string) | string,
  payload:object,
  queryKey:string,
  type:('POST' | 'GET' | 'PUT' | 'DELETE')
) {
  return useFetch(url, {
  
    $fetch: api,
    method:type,
    watch:false,
    body:payload,
    onResponse: async()=>await refreshNuxtData(queryKey)
  })
}

export const api = $fetch.create({

  baseURL: 'http://localhost:1337/api/functions/',
  onRequest({ error, options, request }) {
    options.headers.set('Content-Type', 'application/json')
    options.headers.set('X-Parse-Application-Id', 'appId')
    options.headers.set('X-Parse-REST-API-Key', 'restAPIKey')
  options.headers.set('X-Parse-Session-Token', window?.localStorage.getItem('sessionToken') ?? '')
  },
  onResponseError:(error)=>{
    window?.localStorage.setItem("snackBar",error.response._data)

  }
},
)
