import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const VerifiedResetRoute = ({children}) => {

    const verifiedEmail = localStorage.getItem("verifiedEmail")
    const location = useLocation()

    if(!verifiedEmail) {
        return <Navigate to="/login" state={{from: location}} replace />
    }

    return children 
}
export default VerifiedResetRoute