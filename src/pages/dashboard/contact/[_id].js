import { DeleteWarning } from '@/components/warnings'
import {
  deleteContactThunk,
  singleContactThunk,
} from '@/features/contacts/contactsSlice'
import { showDeleteWarning } from '@/features/websitecontent/websitecontentSlice'
import { formatDate, titleCase } from '@/utils/helper'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

const SingleContact = () => {
  const dispatch = useDispatch()
  const { contacts, websitecontent } = useSelector((state) => state)
  const { isLoading, name, email, mobile, subject, message, createdAt } =
    contacts
  const router = useRouter()
  const { _id } = router.query

  const handleDelete = () => {
    dispatch(showDeleteWarning())
  }

  useEffect(() => {
    if (_id !== undefined) {
      dispatch(singleContactThunk(_id))
    }
  }, [_id])

  if (isLoading) {
    return (
      <div className='title'>
        <h1>Loading...</h1>
        <div className='loading'></div>
      </div>
    )
  }
  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name='description' content={subject} />
      </Head>
      <Wrapper>
        {websitecontent.isDeleteWarning && (
          <DeleteWarning
            action={() => dispatch(deleteContactThunk(_id))}
          ></DeleteWarning>
        )}
        <div className='body-header'>
          <div className='header'>
            <div>
              <span>createdAt:</span>
              <span>{formatDate(createdAt)}</span>
            </div>
            <div>
              <span>name:</span>
              <span>{name}</span>
            </div>
            <div>
              <span>email:</span>
              <span>{email}</span>
            </div>
            <div>
              <span>mobile:</span>
              <span>{mobile}</span>
            </div>
            <div>
              <span>subject:</span>
              <span>{subject}</span>
            </div>
          </div>
          <div className='body'>
            <p>{message}</p>
            <div className='btn-container'>
              <button type='button' className='btn' onClick={handleDelete}>
                Delete
              </button>
              <Link className='btn btn-a' href={`/dashboard/contact`}>
                Go back
              </Link>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  padding: 1rem;
  min-height: 100vh;

  .body-header {
    display: flex;
    justify-content: space-around;

    @media (max-width: 768px) {
      display: grid;
    }
  }
  .header {
    div {
      width: 320px;
      display: grid;
      grid-template-columns: 1fr 2fr;
      border-bottom: 2px solid var(--grey-7);
      span:nth-child(1) {
        font-weight: 500;
      }
      span:nth-child(2) {
      }
      span {
        text-transform: capitalize;
      }
    }
    @media (max-width: 768px) {
      margin: 0 auto;
    }
  }
  .body {
    border: 2px solid var(--grey-2);
    background-color: var(--white);
    margin-bottom: 1rem;

    p {
      margin: 0 auto;
      padding: 1rem;
    }
  }
  .btn-container {
    button {
      margin-right: 1rem;
    }
  }
`
export default SingleContact
