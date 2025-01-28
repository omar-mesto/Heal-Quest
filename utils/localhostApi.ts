import { ApiError } from '../models/apiErrorModel'

const API_BASE_URL = 'http://localhost:1337/api/functions/'

interface FetchOptions<U> {
  body?: U;
  sessionToken?: string;
}

const fetchData = async <T, U>(
  method: 'DELETE' | 'GET' | 'POST',
  endpoint: string,
  options?: FetchOptions<U>,
): Promise<T> => {
  const { body, sessionToken, ...fetchInit } = options || {}

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'X-Parse-Application-Id': 'appId',
    'X-Parse-REST-API-Key': 'restAPIKey',
    ...(sessionToken ? { 'X-Parse-Session-Token': sessionToken } : {}),
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    body: body ? JSON.stringify(body) : undefined,
    headers,
    method,
    ...fetchInit,
  })

  if (!response.ok) {
    const errorData: ApiError = await response.json()
    throw new Error(errorData.error)
  }

  return response.json() as Promise<T>
}

export const localhostAPI = {
  delete: async <T>(endpoint: string, sessionToken?: string): Promise<T> => {
    return fetchData<T, undefined>('DELETE', endpoint, { sessionToken })
  },

  get: async <T>(endpoint: string, sessionToken?: string): Promise<T> => {
    return fetchData<T, undefined>('GET', endpoint, { sessionToken })
  },

  post: async <T, U>(endpoint: string, body: U, sessionToken?: string): Promise<T> => {
    return fetchData<T, U>('POST', endpoint, { body, sessionToken })
  },
}
