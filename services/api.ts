import { Ref } from "vue";
import { api } from './baseApi';
export const getDoctors = async (params:{skip:Ref<number>,limit:Ref<number>}) => {
  return api(`/getDoctor`,{params:params})
}
export const getCategories = () => {
return api('/getCategories')
}
export const getAdvertisment = () => {
  return api('/getAdvertisment')
}
