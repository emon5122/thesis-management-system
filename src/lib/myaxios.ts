import axios from "axios";

const baseUrl=process.env.NODE_ENV==="development"? "http://localhost:3000" :process.env.NEXTAUTH_URL
export const myAxios = axios.create({baseURL:`${baseUrl}/api/`})