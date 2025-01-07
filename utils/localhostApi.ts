import { ApiError } from '../models/apiErrorModel';

const API_BASE_URL = 'http://localhost:1337/api/functions/';  

const fetchData = async <T, U>(  
  method: 'GET' | 'POST' | 'DELETE',  
  endpoint: string,  
  body?: U,
): Promise<T> => {  
  const options: RequestInit = {  
    method,  
    headers: {  
      'Content-Type': 'application/json',  
      'X-Parse-Application-Id': 'appId',   
      'X-Parse-REST-API-Key': 'restAPIKey',  
    },  
  };  

  options.body = JSON.stringify(body);  

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);  

  if (!response.ok) {  
    const errorData: ApiError = await response.json();  
    throw new Error(errorData.message || 'Error fetching data');  
  }  

  return response.json() as Promise<T>;  
};  

export const localhostAPI = {  
  get: async <T>(endpoint: string): Promise<T> => {  
    return fetchData<T, undefined>('GET', endpoint);  
  },  

  post: async <T, U>(endpoint: string, body: U): Promise<T> => {  
    return fetchData<T, U>('POST', endpoint, body);  
  },  

  delete: async <T>(endpoint: string): Promise<T> => {  
    return fetchData<T, undefined>('DELETE', endpoint);  
  },  
};