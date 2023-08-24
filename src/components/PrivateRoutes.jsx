import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import useAuthStats from '../hooks/useAuthStats'
import Spinner from './Spinner'

const PrivateRoutes = () => {
    const {loggedIn,loading}=useAuthStats()

    if(loading){
        return <Spinner/>
    }

  return loggedIn ? <Outlet/> : <Navigate to='/sign-in'/>
}

export default PrivateRoutes