import { useAsyncData } from 'nuxt/app';
import { Ref } from "vue";
import { api, useAPI } from '../services/baseApi';


export const useGetPlacrService = (params:{skip:Ref<number>,limit:Ref<number>}) => {  

  return useAsyncData('placrService', () => api(`/getPlaceService`, {
    params: {
      skip: params.skip.value,
      limit:params.limit.value
    } 
  }), {
    watch: [params.limit,params.skip]
  }
)
}

export const useDeletePlacrService= (placrServiceId:string) => {
  return useAPI({ url: `/addEditPlaceService`,params:{id:placrServiceId} ,queryKey: 'placrService' , type:'DELETE'})
}

export const useCreatePlacrService = (placrService) => {
  return useAPI({url:'/deletePlaceService',payload:placrService,queryKey:'placrService',type:'POST'})
}