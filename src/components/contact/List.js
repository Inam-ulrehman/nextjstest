import styled from 'styled-components'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  allContactsThunk,
  deleteContactThunk,
  deleteManyContactsThunk,
  getStateValues,
} from '@/features/contacts/contactsSlice'

import Link from 'next/link'
import { formatDate } from '@/utils/helper'
import {
  showDeleteAllWarning,
  showDeleteWarning,
} from '@/features/websitecontent/websitecontentSlice'
import { DeleteAllWarning, DeleteWarning } from '../warnings'
import { Icons } from '@/styles/Icons'

const List = () => {
  const dispatch = useDispatch()
  const { contacts, websitecontent } = useSelector((state) => state)
  const {
    isLoading,
    page,
    limit,
    sort,
    searchName,
    searchEmail,
    searchMobile,
    refreshData,
    list,
    deleteMany,
  } = contacts

  //====== handle Delete ====
  const handleDelete = (_id) => {
    const name = 'deleteId'
    const value = _id
    dispatch(getStateValues({ name, value }))
    dispatch(showDeleteWarning())
  }
  // =======deleteMany  =======
  const handleSelectAll = () => {
    if (list.length === deleteMany.length) {
      dispatch(getStateValues({ name: 'deleteMany', value: [] }))
      return
    }
    dispatch(getStateValues({ name: 'deleteMany', value: list }))
  }
  const handleSelectOne = (_id) => {
    if (deleteMany.find((item) => item._id === _id)) {
      dispatch(
        getStateValues({
          name: 'deleteMany',
          value: deleteMany.filter((item) => item._id !== _id),
        })
      )
      return
    }
    const result = list.find((item) => item._id === _id)
    const newValue = [...deleteMany, result]
    dispatch(getStateValues({ name: 'deleteMany', value: newValue }))
  }

  const handleDeleteMany = () => {
    dispatch(showDeleteAllWarning())
  }
  // =======deleteMany =======

  useEffect(() => {
    dispatch(allContactsThunk(contacts))
  }, [page, limit, sort, searchName, searchEmail, searchMobile, refreshData])

  if (isLoading) {
    return (
      <div className='title'>
        <h1>Loading...</h1>
        <div className='loading'></div>
      </div>
    )
  }
  return (
    <Wrapper>
      {/*=== delete warning=== */}
      {websitecontent.isDeleteWarning && (
        <DeleteWarning
          action={() => dispatch(deleteContactThunk(contacts.deleteId))}
        />
      )}
      {/* ====delete many warning */}
      {websitecontent.isDeleteAllWarning && (
        <DeleteAllWarning
          action={() => dispatch(deleteManyContactsThunk(contacts.deleteMany))}
        ></DeleteAllWarning>
      )}
      {/* show delete all button */}
      <div className='delete-all-button'>
        {contacts.deleteMany.length > 0 && (
          <div className='delete-all-button'>
            <button className='btn' onClick={handleDeleteMany}>
              Delete Selected
            </button>
          </div>
        )}
      </div>
      <table>
        <caption>Contact Table</caption>
        <thead>
          <tr>
            <th>
              <input
                type='checkbox'
                checked={contacts.deleteMany.length === contacts.list.length}
                onChange={handleSelectAll}
              />
            </th>
            <th>Name</th>
            <th className='mobile-hide'>Email</th>
            <th className='mobile-hide'>Mobile</th>
            <th className='mobile-hide'>Subject</th>
            <th className=''>Time</th>
            <th className='action'>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => {
            return (
              <tr key={item._id}>
                <td className='delete-button'>
                  <input
                    type='checkbox'
                    checked={
                      contacts.deleteMany.find(
                        (items) => items._id === item._id
                      )
                        ? true
                        : false
                    }
                    onChange={() => handleSelectOne(item._id)}
                  />
                </td>
                <td>{item.name.slice(0, 15)}</td>
                <td className='mobile-hide'>{item.email.slice(0, 20)}</td>
                <td className='mobile-hide'>{item.mobile.slice(0, 13)}</td>
                <td>{item.subject.slice(0, 15)}</td>
                <td className='time mobile-hide'>
                  {formatDate(item.createdAt)}
                </td>
                <td className='action'>
                  <Link
                    className='btn btn-a'
                    href={`/dashboard/contact/${item._id}`}
                  >
                    {Icons.edit}
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className='btn'
                  >
                    {Icons.delete}
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  table {
  }
  .delete-all-button {
    height: 10px;
  }
  .delete-button {
    text-align: center;
  }
  .time {
  }
  .action {
    display: flex;
    justify-content: center;
    border: none;
  }
  .btn-a {
    margin-right: 5px;
  }
  @media (max-width: 768px) {
    padding: 5px;
    .mobile-hide {
      display: none;
    }
  }
`
export default List
