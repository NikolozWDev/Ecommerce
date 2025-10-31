import React from 'react'
import { useAuth } from './AuthProvider'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {

    const {isAuthorized, loading} = useAuth()

    if (loading) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />
}
export default ProtectedRoute