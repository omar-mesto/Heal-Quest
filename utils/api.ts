import { ApiError } from '../models/apiErrorModel'

const API_BASE_URL = 'https://hq.90-soft.com/api/functions/'

const fetchData = async <T, U>(
  method: 'DELETE' | 'GET' | 'POST',
  endpoint: string,
  body?: U,
): Promise<T> => {
  const options: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      'X-Parse-Application-Id': 'appId',
      'X-Parse-REST-API-Key': 'restAPIKey',
    },
    method,
  }

  options.body = JSON.stringify(body)

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options)

  if (!response.ok) {
    const errorData: ApiError = await response.json()
    throw new Error(errorData.error)
  }

  return response.json() as Promise<T>
}

export const api = {
  delete: async <T>(endpoint: string): Promise<T> => {
    return fetchData<T, undefined>('DELETE', endpoint)
},

  get: async <T>(endpoint: string): Promise<T> => {
    return fetchData<T, undefined>('GET', endpoint)
  },

  post: async <T, U>(endpoint: string, body: U): Promise<T> => {
    return fetchData<T, U>('POST', endpoint, body)
  },
}
