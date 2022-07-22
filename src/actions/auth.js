import Swal from "sweetalert2"
import { fetchWithToken, fetchWitoutToken } from "../helpers/fetch"
import { types } from "../types/types"

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const resp = await fetchWitoutToken('auth', { email, password }, 'POST')
    const data = await resp.json()

    if (data.ok) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())

      dispatch(login({
        uid: data.uid,
        name: data.user,
      }))
    } else {
      Swal.fire('Error', data.msg, 'error')
    }

  }
}

export const startRegister = (name, email, password) => {
  return async (dispatch) => {
    const resp = await fetchWitoutToken(
      'auth/register',
      { name, email, password },
      'POST'
    )
    const data = await resp.json()

    if (data.ok) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())

      dispatch(login({
        uid: data.uid,
        name: data.user,
      }))
    } else {
      Swal.fire('Error', data.msg, 'error')
    }
  }
}

const login = (user) => ({
  type: types.authLogin,
  payload: user
})

export const startChecking = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken('auth/renew')
    const data = await resp.json()

    if (data.ok) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())

      dispatch(login({
        uid: data.uid,
        name: data.user,
      }))
    } else {
      dispatch(checkingFinish())
    }
  }
}

const checkingFinish = () => ({
  type: types.authCheckingFinish,
})

export const startLogout = () => {
  return (dispatch) => {
    localStorage.removeItem('token')
    localStorage.removeItem('token-init-date')
    dispatch(logout())
  }
}

const logout = () => ({
  type: types.authLogout
})