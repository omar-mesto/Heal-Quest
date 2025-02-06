import {useAsyncData} from "nuxt/app";
import {api} from "@@/services/baseApi";

export const useConversations = (ids:string[]) => {
    return useAsyncData('conversations',()=>
        api('/getUsersByID',{params:{ids:ids.toString()}}),
        {watch:[ids],immediate:false})
}