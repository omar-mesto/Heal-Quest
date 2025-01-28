import { getCategories } from '@@/services/api'
import { useAsyncData } from 'nuxt/app'

export const useCategories = () => {
  return useAsyncData('categories', () => getCategories())
}
