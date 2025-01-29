import { useAsyncData } from 'nuxt/app'
import { getDoctors } from '../services/api'
import { useAPI } from '../services/baseApi'

export const useDoctors = () => {
  return useAsyncData('doctors', () => getDoctors())
}
export const useCreateDoctor = (doctor) => {
  return useAPI('/crateDoctor',doctor,"doctors","POST")
}