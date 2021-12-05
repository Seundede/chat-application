import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'

const PrivateRoute = ({children, redirectTo}) => {
    const { user } = useContext(AuthContext)
    return (
    user ? children : <Navigate to={redirectTo} />
      
    );
}

export default PrivateRoute
