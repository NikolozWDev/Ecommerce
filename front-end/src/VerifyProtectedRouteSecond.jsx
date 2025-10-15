import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const VerifyProtectedRouteSecond = ({children}) => {

    const verifiedEmail = localStorage.getItem("verifyEmailSecond")
    const location = useLocation()

    if(!verifiedEmail) {
        return <Navigate to="/login" state={{from: location}} replace />
    }

    return children
}
export default VerifyProtectedRouteSecond