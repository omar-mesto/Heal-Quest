import { ApiError } from '../models/apiErrorModel';

const API_BASE_URL = 'https://hq.90-soft.com/api/functions/';  

const fetchData = async <T>(url: string, options: RequestInit = {}): Promise<T> => {  
  const response = await fetch(url, {  
    ...options,  
    headers: {  
      'Content-Type': 'application/json',  
      'X-Parse-Application-Id': 'appId', 
      'X-Parse-REST-API-Key': 'restAPIKey',  
      ...(options.headers || {}),  
    },  
  });  

  if (!response.ok) {  
    const errorData: ApiError = await response.json();  
    throw new Error(errorData.message || 'Error fetching data');  
  }  

  return response.json() as Promise<T>;  
};  

export const api = {  
  get: async <T>(endpoint: string): Promise<T> => {  
    return fetchData<T>(`${API_BASE_URL}${endpoint}`, {  
      method: 'GET',  
    });  
  },  

  post: async <T, U>(endpoint: string, body: U): Promise<T> => {  
    return fetchData<T>(`${API_BASE_URL}${endpoint}`, {  
      method: 'POST',  
      body: JSON.stringify(body),  
    });  
  },  

  put: async <T, U>(endpoint: string, body: U): Promise<T> => {  
    return fetchData<T>(`${API_BASE_URL}${endpoint}`, {  
      method: 'PUT',  
      body: JSON.stringify(body),  
    });  
  },  

  delete: async <T>(endpoint: string): Promise<T> => {  
    return fetchData<T>(`${API_BASE_URL}${endpoint}`, {  
      method: 'DELETE',  
    });  
  },  
};