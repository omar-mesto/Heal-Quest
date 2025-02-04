import { useAsyncData } from 'nuxt/app';
import { Ref } from "vue";
import { api, useAPI } from '../services/baseApi';

export const useUsers = (params:{skip:Ref<number>,limit:Ref<number>}) => { 
  return useAsyncData('users', () => api(`/getUsers`, {
    params: {
      skip: params.skip.value,
      limit:params.limit.value
    } 
  }), {
    watch: [params.limit,params.skip]
  }
)
}
export const useBlockUser = (userId:string) => {
  return useAPI({ url: `/blockUser`,params:{userId:userId} ,queryKey: 'users' , type:'POST'})
}



export const useLoginUser = (user) => {
  return useAPI({url:'/loginClient',payload:user,queryKey:'users',type:'POST'})
}

export const useGenerateOtpUser = (user) => {
  return useAPI({url:'/generateOTP',payload:user,queryKey:'users',type:'POST'})
}