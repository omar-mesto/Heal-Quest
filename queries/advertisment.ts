import { getAdvertisment } from '@@/services/api'
import { api, useAPI } from '@@/services/baseApi'
import { useAsyncData } from 'nuxt/app'
import { Ref } from 'vue'
 
export const useAdvertisment = () => {
  return useAsyncData('advertisments', () => getAdvertisment())
}
export const useDashboardAdvertisment = (params:{skip:Ref<number>,limit:Ref<number>}) => {  

  return useAsyncData('advertisments', () => api(`/getAdvertisment`, {
    params: {
      skip: params.skip.value,
      limit:params.limit.value
    } 
  }), {
    watch: [params.limit,params.skip]
  }
)
}
export const useCreateAdvertisment = (advertisment) => {
  return useAPI({url:'/addCategory',payload:advertisment,queryKey:'advertisments',type:'POST'})
}

export const useDeleteAdvertisment = (advertismentID:string) => {
  return useAPI({ url: `/deleteAdvertisment`,params:{id:advertismentID} ,queryKey: 'advertisments' , type:'DELETE'})
}