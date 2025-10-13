import React from 'react'
import { Navigate } from 'react-router-dom'

const VerifyProtectedRoute = ({children}) => {

    const emailVer = localStorage.getItem("emailVerification")
    if(!emailVer) {
        return <Navigate to="/login" replace />
    }
    return children
}
export default VerifyProtectedRoute