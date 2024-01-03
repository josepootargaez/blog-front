import axios from 'axios';

const baseURL:string ='https://blog-back-git-main-joses-projects-de992dfc.vercel.app/'; //prod
// const baseURL:string ='http://localhost:4000'; //dev
export const Instance = axios.create({
    baseURL,
    headers:{
        AccessControlAllowOrigin:"*",
        AccessControlAllowMethods:"GET,POST,DELETE,PATCH"
    }

})