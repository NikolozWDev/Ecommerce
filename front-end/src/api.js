import axios from 'axios'
import { ACCESS_TOKEN } from './constants'

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || '/',
    headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (token) config.headers.Authorization = `Bearer ${token}`
        return config
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            console.log("Unauthorized - clearing token")
            localStorage.removeItem(ACCESS_TOKEN)
        }
        return Promise.reject(error)
    }
)

export default api