import axios from "axios";

const baseUrl=process.env.NODE_ENV==="development"? "http://localhost:3000" :"https://thesis-management-system-theta.vercel.app"
export const myAxios = axios.create({baseURL:`${baseUrl}/api/`})
