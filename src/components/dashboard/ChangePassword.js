import { customFetch } from '@/utils/axios'
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import FormInput from '../FormInput'

const initialState = {
  password: '',
  confirmPassword: '',
  isLoading: false,
}
const ChangePassword = () => {
  const [state, setState] = useState(initialState)
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!state.password || !state.confirmPassword) {
      return toast.warning('please put your password')
    }
    if (state.password !== state.confirmPassword) {
      return toast.warning(`Password does't match`)
    }
    const cookies = Cookies.get('token')
    try {
      const result = await customFetch.post('/auth/users', state, {
        headers: {
          Authorization: `Bearer ${cookies}`,
        },
      })
      toast.success(result.data.msg)
    } catch (error) {
      toast.error(error.result.data.msg)
    }
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setState({ ...state, [name]: value })
  }
  return (
    <Wrapper>
      <hr />
      <div className='title'>Change your password</div>

      <form className='form' onSubmit={handleSubmit}>
        {/* password */}
        <FormInput
          important={true}
          type='password'
          name='password'
          label='New Password'
          value={state.password}
          onChange={handleChange}
        />
        {/* confirmPassword */}
        <FormInput
          important={true}
          type='password'
          name='confirmPassword'
          label='Confirm New Password'
          value={state.confirmPassword}
          onChange={handleChange}
        />
        <button
          className='btn btn-block'
          type='submit'
          disabled={state.isLoading}
        >
          Change Password
        </button>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  form {
    display: grid;
    grid-template-columns: 1fr;
  }
`
export default ChangePassword
