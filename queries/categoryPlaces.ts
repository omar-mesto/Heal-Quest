import { useAsyncData } from 'nuxt/app';
import { api } from '../services/baseApi';

export const useCategoryPlaces = (params:{id:string}) => {
  return useAsyncData('categoryPlaces', () => api('/getPlaceServiceByCategory',{
    params:{
        id:params.id
    }
  })
)
}


export const useCategoryPlacesById = (params:{id:string}) => {
  return useAsyncData('categoryPlaces', () => api('/getPlaceServiceCategoryById',{
    params:{
        id:params.id
    }
  })
)
}