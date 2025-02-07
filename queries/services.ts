import { useAsyncData } from 'nuxt/app';
import { Ref } from "vue";
import { api, useAPI } from '../services/baseApi';
export const useServices = (params:{skip:Ref<number>,limit:Ref<number>}) => { 

   return useAsyncData('services', () => api(`/getService`, {
      params: {
        skip: params.skip.value,
        limit:params.limit.value
      } 
    }), {
      watch: [params.limit,params.skip]
    }
  )
}
export const useAllServices = (id:string) => { 

  return useAsyncData('allServices', () => api('/getService')
 )
}
export const useGetServices = () => { 

  return useAsyncData('PlaceService', () => api(`/getPlaceService`, {})
 )
}

export const useDeleteService = (id:string) => {
  return useAPI({ url: `/deleteService`,params:{id:id} ,queryKey: 'services' , type:'DELETE'})
}

export const useCreateService = (serviceForm:object) => {
  return useAPI({ url: `/addEditService`, payload:serviceForm ,queryKey: 'services' , type:'POST'})
}