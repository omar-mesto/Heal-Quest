import { getAdvertisment } from '@@/services/api'
import { useAsyncData } from 'nuxt/app'

export const useAdvertisment = () => {
  return useAsyncData('advertisments', () => getAdvertisment())
}
