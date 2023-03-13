import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../Images/logo.png'

const Signup = () => {
  const [data, setData] = useState({
    email: '',
    reWriteEmail: '',
    password: ''
  })
  const [Error, setError] = useState({
    email: {
      empty: false
    },
    reWriteEmail: {
      empty: false,
      match: false
    },
    password: {
      empty: false
    }
  })

  const handleChange = useCallback(
    event => {
      const { name, value } = event.target
      const newData = { ...data, [name]: value }

      switch (name) {
        case 'email':
          setError({ ...Error, email: { empty: data.email === '' } })

          break
        case 'reWriteEmail':
          if (data.reWriteEmail === '') {
            setError({ ...Error, reWriteEmail: { match: true, empty: true } })
          } else {
            if (value === data.email) {
              setError({
                ...Error,
                reWriteEmail: { match: false, empty: false }
              })
            } else {
              setError({
                ...Error,
                reWriteEmail: { match: true, empty: false }
              })
            }
          }
          break
        case 'password':
          setError({ ...Error, password: { empty: data.password === '' } })

          break
        default:
          break
      }

      setData(newData)
    },
    [Error, data]
  )

  const handleSubmit = event => {
    event.preventDefault()
    if (
      data.email !== '' &&
      data.reWriteEmail !== '' &&
      data.reWriteEmail === data.email &&
      data.password !== ''
    ) {
      // handle login logic here
    } else {
      if (data.email === '') {
        setError({ ...Error, email: { empty: true } })
      }

      if (data.reWriteEmail === '') {
        setError({ ...Error, reWriteEmail: { match: false, empty: true } })
      }

      if (data.reWriteEmail !== data.email) {
        setError({ ...Error, reWriteEmail: { match: true, empty: false } })
      }

      if (data.password === '') {
        setError({ ...Error, password: { empty: true } })
      }
    }
  }

  return (
    <div className='flex justify-center items-center h-[100vh] bg-[#f9fafb]'>
      <div className='w-[448px]'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <img src={logo} alt='Kiwify' className='mx-auto h-12 w-auto' />
          <h2 className='mt-6 text-center  text-3xl leading-9 font-extrabold text-gray-900'>
            Criar nova conta
          </h2>
          <p className='mt-2 text-center text-base leading-5 text-gray-600'>
            Ou
            <Link
              href='/login'
              className='ml-1 font-medium underline text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150'
            >
              entrar na sua conta existente
            </Link>
          </p>
        </div>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <div>
              <label className='block text-sm font-medium leading-5 mb-1 text-gray-700'>
                E-mail
              </label>
              <div>
                <input
                  value={data.email}
                  onBlur={() =>
                    data.email === '' &&
                    setError({ ...Error, email: { empty: true } })
                  }
                  type='text'
                  name='email'
                  onChange={handleChange}
                  autocomplete='off'
                  className={`form-input block py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${
                    Error.email.empty ? 'border-red-500' : ''
                  } w-full`}
                />

                {Error.email.empty && (
                  <div className='h-[18px] text-xs text-red-500'>
                    Esse campo é obrigatório
                  </div>
                )}
              </div>
            </div>

            <div className='mt-6'>
              <label className='block text-sm font-medium leading-5 mb-1 text-gray-700'>
                Repetir e-mail
              </label>
              <div>
                <input
                  onBlur={() =>
                    data.reWriteEmail === '' &&
                    setError({
                      ...Error,
                      reWriteEmail: { match: true, empty: true }
                    })
                  }
                  value={data.reWriteEmail}
                  onChange={handleChange}
                  type='email'
                  name='reWriteEmail'
                  autocomplete='off'
                  className={`form-input block py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${
                    Error.reWriteEmail.empty || Error.reWriteEmail.match
                      ? 'border-red-500'
                      : ''
                  } w-full`}
                />
                <div className='text-red-500 text-xs mt-1'>
                  {Error.reWriteEmail.match && (
                    <div className='h-[18px]'>
                      Os dois e-mails devem ser iguais.
                    </div>
                  )}
                  {Error.reWriteEmail.empty && (
                    <div className='h-[18px]'>Esse campo é obrigatório</div>
                  )}
                </div>
              </div>
            </div>

            <div className='mt-6'>
              <label className='block text-sm font-medium leading-5 text-gray-700'>
                Senha
              </label>
              <div>
                <input
                  value={data.password}
                  onChange={handleChange}
                  onBlur={() =>
                    data.password === '' &&
                    setError({ ...Error, password: { empty: true } })
                  }
                  type='password'
                  autocomplete='off'
                  name='password'
                  className={`form-input block py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 ${
                    Error.password.empty ? 'border-red-500' : ''
                  } w-full`}
                />
                {Error.password.empty && (
                  <div className='h-[18px] text-red-500 text-xs mt-1'>
                    Esse campo é obrigatório
                  </div>
                )}
              </div>
            </div>

            <div className='mt-6'>
              <label className='relative flex items-start mt-2'>
                <div className='flex items-center h-5'>
                  <input
                    type='checkbox'
                    className='form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out cursor-pointer'
                  />
                </div>
                <div className='ml-2 text-sm leading-5'>
                  <span className='font-medium text-gray-700'>
                    Eu li e aceito os
                    <Link className='underline'> termos de uso</Link>,
                    <Link className='underline'>
                      {' '}
                      termos de licença de uso de software
                    </Link>
                    ,<Link className='underline'> política de conteúdo</Link> da
                    Kiwify
                  </span>
                </div>
              </label>
            </div>

            <div className='mt-6'>
              <span className='block w-full rounded-md shadow-sm'>
                <button
                  onClick={handleSubmit}
                  className='h-[38.6px] w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out'
                >
                  Criar conta
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
