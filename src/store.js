import { configureStore } from '@reduxjs/toolkit'
import blogsSlice from './features/blogs/blogsSlice'
import contactsSlice from './features/contacts/contactsSlice'
import globalSlice from './features/global/globalSlice'
import usersSlice from './features/users/usersSlice'
import websitecontentSlice from './features/websitecontent/websitecontentSlice'

const store = configureStore({
  reducer: {
    global: globalSlice,
    users: usersSlice,
    contacts: contactsSlice,
    blogs: blogsSlice,
    websitecontent: websitecontentSlice,
  },
})

export default store
