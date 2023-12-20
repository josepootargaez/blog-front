import axios from 'axios';

const baseURL:string ='http://localhost:3004/';
export const Instance = axios.create({
    baseURL,
    headers:{
        AccessControlAllowOrigin:"*",
        AccessControlAllowMethods:"GET,POST,DELETE,PATCH"
    }

})