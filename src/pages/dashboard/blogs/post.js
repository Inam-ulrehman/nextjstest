import BlogDesign from '@/components/dashboard/blog/BlogDesign'
import DashboardLayout from '@/components/dashboard/dashboard-layout'
import FormInput from '@/components/FormInput'
import UploadImage from '@/components/images/UploadImage'
import {
  clearState,
  createBlogThunk,
  getStateValues,
} from '@/features/blogs/blogsSlice'
import Head from 'next/head'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'

const PostBlog = () => {
  const dispatch = useDispatch()
  const { blogs } = useSelector((state) => state)
  const {
    heading,
    description,
    image,
    blogHeading,
    blogDescription,
    isLoading,
  } = blogs

  // image results
  const cbFunction = (images) => {
    dispatch(getStateValues({ name: 'image', value: images }))
  }
  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (image.length === 0) {
      return toast.warning('Please upload image')
    }
    if (!heading || !description || !blogHeading || !blogDescription) {
      return toast.warning('Please fill all inputs')
    }

    dispatch(createBlogThunk(blogs))
  }
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(getStateValues({ name, value }))
  }
  useEffect(() => {
    dispatch(clearState())
  }, [])
  return (
    <>
      <Head>
        <title>Post New Blog</title>
        <meta name='description' content='Your dashboard page.' />
      </Head>

      <Wrapper>
        <div className='input'>
          <UploadImage
            cbFunction={cbFunction}
            path={'/authadmin/images/blog'}
          />
          <form className='form' onSubmit={handleSubmit}>
            {/* heading */}
            <FormInput
              value={heading}
              name='heading'
              important={true}
              onChange={handleChange}
            />
            {/* description */}
            <FormInput
              value={description}
              name='description'
              important={true}
              onChange={handleChange}
            />
            {/* blogHeading */}
            <FormInput
              value={blogHeading}
              name='blogHeading'
              label={'Blog Heading'}
              important={true}
              onChange={handleChange}
            />
            {/* blog Description */}
            <div className='description'>
              <label className='form-label'>
                Description <span>*</span>
              </label>
              <textarea
                className='form-input'
                name='blogDescription'
                value={blogDescription}
                onChange={handleChange}
                cols='40'
                rows='10'
              ></textarea>
            </div>
            <button className='btn' type='submit' disabled={isLoading}>
              Submit
            </button>
          </form>
        </div>
        <div className='blog-design'>
          <BlogDesign blogs={blogs} />
        </div>
      </Wrapper>
    </>
  )
}

PostBlog.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>
}

const Wrapper = styled.div`
  /* desktop only  */

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 2fr;
    margin-top: 1rem;
    .input {
      background-color: var(--white);
      position: relative;
      position: sticky;
      min-height: 100%;
      .form {
        position: sticky;
        top: 0;
      }
    }
    .description {
      span {
        color: red;
      }
    }
    .blog-design {
      background-color: var(--white);
      img {
        max-width: 600px;
      }
    }
  }
`
export default PostBlog
