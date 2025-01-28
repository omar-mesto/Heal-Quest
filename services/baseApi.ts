export function useAPI<T>(
  url: (() => string) | string,
  options?: UseFetchOptions<T>,
) {
  return useFetch(url, {
    ...options,
    $fetch: api,
  })
}

export const api = $fetch.create({

  baseURL: 'http://localhost:1337/api/functions/',
  onRequest({ error, options, request }) {
    options.headers.set('Content-Type', 'application/json')
    options.headers.set('X-Parse-Application-Id', 'appId')
    options.headers.set('X-Parse-REST-API-Key', 'restAPIKey')
    options.headers.set('X-Parse-Session-Token', window?.localStorage.getItem('sessionToken') ?? '')
  },
},
)
