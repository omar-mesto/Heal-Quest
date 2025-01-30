import { useAsyncData } from 'nuxt/app';
import { Ref } from "vue";
import { api, useAPI } from '../services/baseApi';
export const useDoctors = (params:{skip:Ref<number>,limit:Ref<number>}) => {
  
  return useAsyncData('doctors', () => api(`/getDoctor`, {
    params: {
      skip: params.skip.value,
      limit:params.limit.value
    } 
  }), {
    watch: [params.limit,params.skip]
  }
)
}
export const useCreateDoctor = (doctor) => {
  return useAPI({url:'/crateDoctor',payload:doctor,queryKey:'doctors',type:'POST'})
}
export const useDeleteDoctor = (doctorId:string) => {
  return useAPI({ url: `/deleteDoctor`,params:{id:doctorId} ,queryKey: 'doctors' , type:'DELETE'})
}
