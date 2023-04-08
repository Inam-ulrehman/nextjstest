import { customFetch } from '@/utils/axios'
import {
  getItemFromLocalStorage,
  setItemInLocalStorage,
} from '@/utils/localStorage'
import Cookies from 'js-cookie'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'

const initialState = {
  uploadedImages: [],
  file: null,
  isLoading: false,
  submitImage: false,
}
const useUploadImage = ({ path, cbFunction, imageTitle }) => {
  const { blogs } = useSelector((state) => state)
  const [state, setState] = useState(initialState)
  const imageRef = useRef()

  const handleChange = async (e) => {
    setState({ ...state, file: e.target.files[0] })
  }
  const handleSubmit = async () => {
    setState({ ...state, isLoading: true })

    const cookies = Cookies.get('token')
    try {
      const formData = new FormData()
      formData.append('file', state.file)
      const result = await customFetch.post(`${path}`, formData, {
        headers: {
          Authorization: `Bearer ${cookies}`,
        },
      })
      const image = result.data.result
      setState({
        ...state,
        isLoading: false,
        uploadedImages: [...state.uploadedImages, image],
      })
      const item = [...state.uploadedImages, image]
      setItemInLocalStorage('uploadImage', item)
      toast.success('Image Updated.')
      imageRef.current.value = ''
      return
    } catch (error) {
      console.log(error)
      setState({ ...state, isLoading: false })
      toast.error('Image is not uploaded.')
    }
  }

  // =====Delete Image==========
  const handleDelete = async (public_id) => {
    const cookies = Cookies.get('token')
    setState({ ...state, isLoading: true })
    try {
      const result = await customFetch.post(
        '/authadmin/images/destroy',
        { public_id },
        {
          headers: {
            Authorization: `Bearer ${cookies}`,
          },
        }
      )
      const filterImages = state.uploadedImages.filter(
        (item) => item.public_id !== public_id
      )
      setItemInLocalStorage('uploadImage', filterImages)
      setState({ ...state, isLoading: false })
    } catch (error) {
      setState({ ...state, isLoading: false })
      console.log(error)
    }
  }

  // ===== set image in local storage and cb function===========
  useEffect(() => {
    const localImages = getItemFromLocalStorage('uploadImage')
    if (localImages === null) {
      return
    }
    setState({ ...state, uploadedImages: localImages })
    cbFunction(localImages)
  }, [state.isLoading])
  // =======submit image ==========
  useEffect(() => {
    if (state.file === null) {
      return
    }
    handleSubmit()
  }, [state.file])

  // ======= clean image from component ======
  useEffect(() => {
    if (getItemFromLocalStorage('uploadImage') === null) {
      setState({ ...state, uploadedImages: [] })
    }
  }, [blogs.removeImage])
  return (
    <Wrapper>
      {/* ==========upload Image============ */}
      <div className='file-upload-container'>
        <label htmlFor='file-upload' className='btn'>
          Upload
          <input
            type='file'
            id='file-upload'
            ref={imageRef}
            className='custom-file-input'
            onChange={handleChange}
          />
        </label>
      </div>

      {/* ===========List Of images ======== */}
      <div className='image-list-container'>
        {state.uploadedImages?.map((item, index) => {
          return (
            <div key={index} className='image-container'>
              <Image
                alt='folder'
                width={100}
                height={100}
                src={item.secure_url}
              />
              <button
                className='btn '
                onClick={() => handleDelete(item.public_id)}
              >
                Delete
              </button>
            </div>
          )
        })}
        {state.isLoading && <div className='loading' />}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  place-content: center;
  /* imageUpload */
  .file-upload-container {
    text-align: center;
    input[type='file'] {
      display: none;
    }
  }

  /*========= upload images List======== */
  .image-list-container {
    display: flex;
    flex-wrap: wrap;
    .image-container {
      margin: 5px;
      border: 2px solid var(--grey-3);
      display: grid;
      img {
        object-fit: contain;
      }
      .btn {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }
    }
  }
`
export default useUploadImage

// ======= how to use=======
// api `path` to deliver image and handle from back end
// cb function ro receive images [] back .
// images also stored in localStorage .
//
