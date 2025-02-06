import { useAsyncData } from 'nuxt/app';
import { api, useAPI } from '../services/baseApi';

export const usePlaces = () => { 
  return useAsyncData('places', () => api(`/getPlaces`, {})
)
}
export const useDeletePlace = (placeId:string) => {
  return useAPI({ url: `/deletePlaces`,params:{id:placeId} ,queryKey: 'places' , type:'DELETE'})
}
