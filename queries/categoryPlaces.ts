import { useAsyncData } from 'nuxt/app';
import { api } from '../services/baseApi';

export const useCategoryPlaces = (id:string) => {
  return useAsyncData('categoryPlaces', () => api('/getPlacesByCategory',{
    params:{
      categoryId:id
    }
  })
)
}