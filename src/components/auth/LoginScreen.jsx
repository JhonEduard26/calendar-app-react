import React from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { startLogin, startRegister } from '../../actions/auth'
import { useForm } from '../../hooks/useForm'
import './login.css'

export const LoginScreen = () => {

  const dispatch = useDispatch()

  const [formLoginValues, handleLoginInputChange] = useForm({
    lEmail: 'jhon@mail.com',
    lPassword: '12345678',
  })
  const { lEmail, lPassword } = formLoginValues

  const [formRegisterValues, handleRegisterInputChange] = useForm({
    rName: 'fernando',
    rEmail: 'fernando@mail.com',
    rPassword1: '12345678',
    rPassword2: '12345678',
  })

  const { rName, rEmail, rPassword1, rPassword2 } = formRegisterValues

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(startLogin(lEmail, lPassword))
  }

  const handleRegister = (e) => {
    e.preventDefault()

    if (rPassword1 !== rPassword2) {
      return Swal.fire('Error', 'Passwords must be match', 'error')
    }
    dispatch(startRegister(rName, rEmail, rPassword1))
  }

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name='lEmail'
                value={lEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name='lPassword'
                value={lPassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Login"
              />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={rName}
                name="rName"
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                value={rEmail}
                name="rEmail"
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                value={rPassword1}
                name="rPassword1"
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                value={rPassword2}
                name="rPassword2"
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}