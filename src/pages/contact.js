import FormInput from '@/components/FormInput'

import { customFetch } from '@/utils/axios'
import { imagesData, websiteContent } from '@/utils/data'
import { CldImage } from 'next-cloudinary'
import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'

const initialState = {
  name: '',
  email: '',
  mobile: '',
  subject: '',
  message: '',
  isLoading: false,
}
const Contact = () => {
  const [state, setState] = useState(initialState)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!state.name) {
      return toast.warning('Please enter name')
    }
    if (!state.email) {
      return toast.warning('Please enter email')
    }
    if (!state.mobile) {
      return toast.warning('Please enter mobile')
    }
    if (!state.subject) {
      return toast.warning('Please enter subject')
    }
    if (!state.subject) {
      return toast.warning('Please enter message')
    }
    try {
      setState({ ...state, isLoading: true })
      const result = await customFetch.post('/contacts', state)
      toast.success('Your request is submitted.')
      setState(initialState)
    } catch (error) {
      setState({ ...state, isLoading: false })
      toast.error(error.response.statusText)
      console.log(error.response)
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
        <title> Get in Touch with Our Team</title>
        <meta
          name='description'
          content='We would love to hear from you! Whether you have a question about our services, want to discuss your project, or simply want to say hello, our team is here to help.'
        />
        <link
          rel='canonical'
          href={`${websiteContent.seo.websiteName}/contact`}
        />
      </Head>

      <Wrapper className='section'>
        <div className='contact-image'>
          <CldImage
            src={imagesData.contact}
            width={400}
            height={400}
            alt='contact us'
          />
        </div>
        <div className='form'>
          <h1 className='title'>How can we help ?</h1>
          <div className='title-underline'></div>
          <form onSubmit={handleSubmit} className='form-container'>
            {/* name */}
            <FormInput name='name' value={state.name} onChange={handleChange} />
            {/* email */}
            <FormInput
              name='email'
              value={state.email}
              onChange={handleChange}
            />
            {/* mobile */}
            <FormInput
              name='mobile'
              value={state.mobile}
              onChange={handleChange}
            />
            {/* subject */}
            <FormInput
              name='subject'
              value={state.subject}
              onChange={handleChange}
            />
            {/* message */}
            <label htmlFor='message' className='form-label'>
              Message
            </label>
            <textarea
              className='form-input'
              type='text'
              cols='50'
              rows='5'
              name='message'
              value={state.message}
              onChange={handleChange}
            />
            <button type='submit' className='btn' disabled={state.isLoading}>
              Submit
            </button>
          </form>
        </div>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  padding-top: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  @media (max-width: 620px) {
    .contact-image {
      display: none;
    }
  }
  .contact-image {
  }
  .form {
    h1 {
      margin-top: 0;
      font-size: medium;
      font-weight: 500;
    }
    .form-container {
    }
    button {
      width: 100%;
    }
  }
`
export default Contact
