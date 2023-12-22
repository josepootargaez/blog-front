import axios from 'axios';

const baseURL:string ='https://blog-back-git-main-joses-projects-de992dfc.vercel.app/';
export const Instance = axios.create({
    baseURL,
    headers:{
        AccessControlAllowOrigin:"*",
        AccessControlAllowMethods:"GET,POST,DELETE,PATCH"
    }

})