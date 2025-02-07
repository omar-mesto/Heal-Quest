import { useAsyncData } from 'nuxt/app';
import { Ref } from "vue";
import { api, useAPI } from '../services/baseApi';


export const useGetAllPlaceService = () => {  
  return useAsyncData('placeService', () => api(`/getAllPlaceService`, {})
)
}


export const useDeletePlacrService= (placrServiceId:string) => {
  return useAPI({ url: `/addEditPlaceService`,params:{id:placrServiceId} ,queryKey: 'placrService' , type:'DELETE'})
}

export const useCreatePlacrService = (placrService) => {
  return useAPI({url:'/deletePlaceService',payload:placrService,queryKey:'placrService',type:'POST'})
}