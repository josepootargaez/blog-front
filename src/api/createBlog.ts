import { Instance } from "./config"

export const createBlog = async (obj:any)=>{
    try {
        const response = await Instance({
            method:"post",
            url:"/blog",
            headers:{},
            data:obj
        })
        return response.data;
    } catch (error) {
        return error
    }
}