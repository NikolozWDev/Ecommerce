import axios from 'axios'
import { ACCESS_TOKEN } from './constants'

const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"

const api = axios.create({
    baseURL: isLocalhost 
        ? "http://127.0.0.1:8000" 
        : "https://e-commerce-9y29.onrender.com"
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
export default api