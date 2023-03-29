import { customFetch } from '@/utils/axios'
import { addObjectInState } from '@/utils/helper'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

const initialState = {
  // register
  name: '',
  email: '',
  mobile: '',
  subject: '',
  message: '',
  // Search
  searchName: '',
  searchEmail: '',
  searchMobile: '',
  // Pagination
  list: [],
  page: 1,
  limit: 10,
  nbHits: '',
  sort: '-createdAt',
  searchConfirmed: false,
  //Id's
  deleteId: '',
  updateId: '',
  _id: '',
  refreshData: false,
  // Delete Many
  deleteMany: [],
  isLoading: false,
}
// ========================================
export const contactsThunk = createAsyncThunk(
  'contacts/contactsThunk',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get('/contacts')

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
//======== Get All Contacts========
export const allContactsThunk = createAsyncThunk(
  'contacts/allContactsThunk',

  async (state, thunkAPI) => {
    const cookies = Cookies.get('token')
    try {
      const response = await customFetch.get(
        `/authadmin/contacts?name=${state?.searchName}&email=${state?.searchEmail}&mobile=${state?.searchMobile}&sort=${state?.sort}&limit=${state?.limit}&page=${state?.page}`,
        {
          headers: {
            Authorization: `Bearer ${cookies}`,
          },
        }
      )

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// ==============Single Contact ======================
export const singleContactThunk = createAsyncThunk(
  'contacts/singleContactThunk',
  async (_id, thunkAPI) => {
    try {
      const response = await customFetch.get(`/authadmin/contacts/${_id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      })

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// ==============Delete Contact ======================
export const deleteContactThunk = createAsyncThunk(
  'contacts/deleteContactThunk',
  async (_id, thunkAPI) => {
    const cookies = Cookies.get('token')
    try {
      const response = await customFetch.delete(`/authadmin/contacts/${_id}`, {
        headers: {
          Authorization: `Bearer ${cookies}`,
        },
      })

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// ==== Delete Many ====

export const deleteManyContactsThunk = createAsyncThunk(
  'appointment/deleteManyContactsThunk',
  async (data, thunkAPI) => {
    try {
      const response = await customFetch.patch(`/authadmin/contacts`, data, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      })
      return response.data
    } catch (error) {
      console.log(error.response)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    createFunction: (state, { payload }) => {
      console.log('function call')
    },
    getStateValues: (state, { payload }) => {
      const { name, value } = payload
      state[name] = value
    },
    clearState: (state, { payload }) => {
      // search
      state.searchName = ''
      state.searchEmail = ''
      state.searchMobile = ''
      // pagination
      state.page = 1
      state.limit = 10
      state.sort = '-createdAt'
    },
    //======pagination=======
    next: (state, { payload }) => {
      state.page = state.page + 1
    },
    prev: (state, { payload }) => {
      state.page = state.page - 1
    },
    index: (state, { payload }) => {
      const index = Number(payload)
      state.page = index
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(contactsThunk.pending, (state, { payload }) => {
        console.log('promise pending')
        state.isLoading = true
      })
      .addCase(contactsThunk.fulfilled, (state, { payload }) => {
        console.log('promise fulfilled')
        console.log(payload)
        state.isLoading = false
      })
      .addCase(contactsThunk.rejected, (state, { payload }) => {
        console.log('promise rejected')
        console.log(payload)
        state.isLoading = false
      })
      // ==========allContactsThunk===============
      .addCase(allContactsThunk.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(allContactsThunk.fulfilled, (state, { payload }) => {
        state.list = payload.list
        state.nbHits = payload.nbHits
        if (payload.nbHits < 10) {
          state.page = 1
        }
        state.isLoading = false
      })
      .addCase(allContactsThunk.rejected, (state, { payload }) => {
        console.log(payload)
        state.isLoading = false
      })
      // ===========singleContactThunk===========
      .addCase(singleContactThunk.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(singleContactThunk.fulfilled, (state, { payload }) => {
        addObjectInState(payload.result, state)
        state.isLoading = false
      })
      .addCase(singleContactThunk.rejected, (state, { payload }) => {
        toast.error(payload.msg)
        state.isLoading = false
      })
      // ===========deleteContactThunk===========
      .addCase(deleteContactThunk.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(deleteContactThunk.fulfilled, (state, { payload }) => {
        toast.success(payload.msg)
        state.refreshData = !state.refreshData
        state.isLoading = false
      })
      .addCase(deleteContactThunk.rejected, (state, { payload }) => {
        toast.error(payload.msg)
        state.isLoading = false
      })
      // ===========deleteManyContactsThunk===========
      .addCase(deleteManyContactsThunk.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(deleteManyContactsThunk.fulfilled, (state, { payload }) => {
        toast.success(payload.msg)
        state.refreshData = !state.refreshData
        state.isLoading = false
      })
      .addCase(deleteManyContactsThunk.rejected, (state, { payload }) => {
        toast.error(payload.msg)
        state.isLoading = false
      })
  },
})
export const { createFunction, getStateValues, clearState, next, prev, index } =
  contactsSlice.actions
export default contactsSlice.reducer
