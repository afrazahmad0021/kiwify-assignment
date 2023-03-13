import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../Images/logo.png'

const Login = () => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState({
    format: false,
    empty: false
  })
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)

  const handleEmailChange = useCallback(
    event => {
      setEmail(event.target.value)
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

      setEmailError({
        format: !isValid,
        empty: false
      })
    },
    [email]
  )

  const handlePasswordChange = useCallback(event => {
    setPassword(event.target.value)
    setPasswordError(false)
  }, [])

  const handleSubmit = useCallback(
    event => {
      event.preventDefault()
      if (email === '') {
        setEmailError(true)
      }
      if (password === '') {
        setPasswordError(true)
      }
      // handle login logic here
    },
    [email, password]
  )

  return (
    <div className='flex justify-center items-center h-[100vh] bg-[#f9fafb]'>
      <div className='w-[448px]'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <img src={logo} alt='Workflow' className='mx-auto h-12 w-auto' />
          <h2 className='mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900'>
            Entrar na sua conta
          </h2>
          <p className='mt-2 text-center text-base leading-5 text-gray-600'>
            Ou
            <Link
              to='/signup'
              className='font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150 ml-1'
            >
              fazer cadastro
            </Link>
          </p>
        </div>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <form
            onSubmit={handleSubmit}
            className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'
          >
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-5 mb-1 text-gray-700'
              >
                E-mail
              </label>
              <input
                onBlur={() =>
                  email === '' && setEmailError({ format: false, empty: true })
                }
                type='text'
                autoComplete='username'
                name='email'
                value={email}
                onChange={handleEmailChange}
                className={`form-input block py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${
                  emailError.empty || emailError.format ? 'border-red-500' : ''
                } w-full`}
              />
              {emailError.empty && (
                <div className='text-xs text-red-500 mt-1 h-[18px]'>
                  Esse campo é obrigatório
                </div>
              )}
              {emailError.format && (
                <div className='text-xs text-red-500 mt-1 h-[18px]'>
                  O e-mail deve ser válido
                </div>
              )}
            </div>
            <div className='mt-6'>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-5 text-gray-700'
              >
                Senha
              </label>
              <div>
                <input
                  onBlur={() => password === '' && setPasswordError(true)}
                  type='password'
                  autoComplete='current-password'
                  name='password'
                  value={password}
                  onChange={handlePasswordChange}
                  className={`form-input block py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${
                    passwordError ? 'border-red-500' : ''
                  } w-full`}
                />
                {passwordError && (
                  <div className='text-xs text-red-500 mt-1 h-[18px]'>
                    Esse campo é obrigatório
                  </div>
                )}
              </div>
            </div>
            <div className='mt-2 flex items-center justify-end'>
              <div className='text-sm leading-5'>
                <Link className='font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150 w-[119.84px]'>
                  Esqueceu a senha?
                </Link>
              </div>
            </div>
            <div className='mt-6'>
              <span className='block w-full rounded-md shadow-sm'>
                <button
                  type='button'
                  className='h-[38.6px] w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out'
                >
                  Entrar
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
