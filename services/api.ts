import { api } from './baseApi'

export const getDoctors = async () => {
  return api('/getDoctor')
}
export const getCategories = () => {
return api('/getCategory')
}
export const getAdvertisment = () => {
  return api('/getAdvertisment')
}