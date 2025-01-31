import { getCategories } from '@@/services/api';
import { useAsyncData } from 'nuxt/app';
import { Ref } from "vue";
import { api, useAPI } from '../services/baseApi';

export const useCategories = () => {
  return useAsyncData('categories', () => getCategories())
}

export const useDashboardCategories = (params:{skip:Ref<number>,limit:Ref<number>}) => {  
  return useAsyncData('categories', () => api(`/getCategories`, {
    params: {
      skip: params.skip.value,
      limit:params.limit.value
    } 
  }), {
    watch: [params.limit,params.skip]
  }
)
}

export const useDeleteCategory = (categoryId:string) => {
  return useAPI({ url: `/deleteCategory`,params:{id:categoryId} ,queryKey: 'categories' , type:'DELETE'})
}

export const useCreateCategory = (category) => {
  return useAPI({url:'/addCategory',payload:category,queryKey:'categories',type:'POST'})
}