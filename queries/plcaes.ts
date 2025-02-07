import { useAsyncData } from 'nuxt/app';
import { api, useAPI } from '../services/baseApi';

export const usePlaces = () => { 
  return useAsyncData('places', () => api(`/getPlaces`, {})
)
}
export const useDeletePlace = (placeId:string) => {
  return useAPI({ url: `/deletePlaces`,params:{id:placeId} ,queryKey: 'places' , type:'DELETE'})
}

export const useCreatePlace = (placeForm:object) => {
  return useAPI({ url: `/addEditPlaces`, payload:placeForm ,queryKey: 'places' , type:'POST'})
}


export const useCreatePlaceService = (form:object) => {
  return useAPI({ url: `/addEditPlaceService`, payload:form ,queryKey: 'placeServices' , type:'POST'})
}