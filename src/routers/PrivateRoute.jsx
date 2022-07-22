import React from 'react'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({ children, logged }) => {
  return logged ? children : <Navigate to='login' />
}
