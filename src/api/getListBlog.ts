import { Instance } from "./config";

export const getListBlog = async ()=>{
    try {
        const response = await Instance({
            method:"get",
            url:"/list",
            headers:{},
        })
        return response.data.data;
    } catch (error) {
        return error
    }
}