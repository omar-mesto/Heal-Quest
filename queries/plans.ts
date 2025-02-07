import { api } from "@@/services/baseApi"
import { useAsyncData } from "nuxt/app"

export const usePlans=(id:string)=>{
return  useAsyncData('plans',()=>api('/getInvoice',{params:{userId:id}}))
}