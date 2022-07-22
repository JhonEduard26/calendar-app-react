import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'
import { useEffect } from 'react'
import { startChecking } from '../actions/auth'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const AppRouter = () => {

  const dispatch = useDispatch()

  const { checking, uid } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(startChecking())
  }, [dispatch])

  if (checking) {
    return <h5>Loading...</h5>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <PrivateRoute logged={!!uid}>
            <CalendarScreen />
          </PrivateRoute>
        } />
        <Route path='login' element={
          <PublicRoute logged={!!uid}>
            <LoginScreen />
          </PublicRoute>
        } />
        <Route path='*' element={<h1>Error 404</h1>} />
      </Routes>
    </BrowserRouter>
  )
}
