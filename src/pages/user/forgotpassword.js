import FormInput from '@/components/FormInput'
import { customFetch } from '@/utils/axios'
import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'

const initialState = {
  email: '',
  isLoading: false,
}
const ForgotPassword = () => {
  const [state, setState] = useState(initialState)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!state.email) {
      return toast.warning('please provide email')
    }
    setState({ ...state, isLoading: true })
    try {
      const result = await customFetch.post(
        '/users/email-link-forgot-password',
        state
      )
      if (result?.data?.msg === 'success') {
        toast.success('Email is sent with verification link')
      }
      setState(initialState)
    } catch (error) {
      setState({ ...state, isLoading: false })
      toast.error(error?.response?.data?.msg)
    }
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setState({ ...state, [name]: value })
  }
  return (
    <>
      <Head>
        <title>Forgot Password</title>
        <meta name='description' content='Member page' />
      </Head>

      <Wrapper>
        <div className='image-container'></div>
        <div className='form-container'>
          <form onSubmit={handleSubmit} className='form'>
            {/* email */}
            <FormInput
              type='email'
              name='email'
              important={true}
              value={state.email}
              onChange={handleChange}
            />
            <div className='btn-container'>
              <Link href={'/user/login'} className='btn btn-a'>
                Login / Register
              </Link>
              <button type='submit' className='btn' disabled={state.isLoading}>
                {state.isLoading && <span className='loading-span'></span>}
                <span className='btn-span'>Send Email</span>
              </button>
            </div>
          </form>
        </div>
      </Wrapper>
    </>
  )
}
const Wrapper = styled.div`
  .btn-container {
    display: flex;
    justify-content: space-between;
  }
`
export default ForgotPassword
