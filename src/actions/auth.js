import { fetchWitoutToken } from "../helpers/fetch"
import { types } from "../types/types"

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const resp = await fetchWitoutToken('auth', { email, password }, 'POST')
    const data = await resp.json()

    if (data.ok) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('token-init-date', new Date().getTime())
    }

    dispatch(login({
      uid: data.uid,
      name: data.user,
    }))
  }
}

const login = (user) => ({
  type: types.authLogin,
  payload: user
})