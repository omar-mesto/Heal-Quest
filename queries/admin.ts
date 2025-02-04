import { useAPI } from '../services/baseApi';

export const useLoginAdmin = (admin) => {
  return useAPI({url:'/logIn',payload:admin,queryKey:'admin',type:'POST'})
}

