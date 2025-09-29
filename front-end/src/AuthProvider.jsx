import React from 'react'
import api from './api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants'
import { jwtDecode } from 'jwt-decode'

const AuthContext = React.createContext()
export const useAuth = () => React.useContext(AuthContext)
export const AuthProvider = ({children}) => {
    
    const [isAuthorized, setIsAuthorized] = React.useState(null)

    React.useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    async function refreshToken() {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            const res = await api.post("api/token/refresh/", {refresh: refreshToken})
            if(res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch(error) {
            console.log(error)
            setIsAuthorized(false)
        }
    }

    async function auth() {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if(!token) {
            setIsAuthorized(false)
            return
        }
        const decoded = jwtDecode(token)
        const now = Date.now() / 1000
        if(decoded.exp < now) {
            await refreshToken()
        } else {
            setIsAuthorized(true)
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthorized, setIsAuthorized }}>
            {children}
        </AuthContext.Provider>
    )

}