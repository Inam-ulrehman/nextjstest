import { customFetch } from '@/utils/axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  // register
  name: '',
  lastName: '',
  gender: '',
  dateOfBirth: '',
  apartment: '',
  house: '',
  street: '',
  city: '',
  province: '',
  country: '',
  postalCode: '',
  mobile: '',
  email: '',
  password: '',
  verified: '',
  notes: '',

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
export const usersThunk = createAsyncThunk(
  'users/usersThunk',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get('/products/static')

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
//======== Get All Users========
export const allUsersThunk = createAsyncThunk(
  'users/allUsersThunk',

  async (state, thunkAPI) => {
    const cookies = Cookies.get('token')
    try {
      const response = await customFetch.get(
        `/authadmin/users?name=${state?.searchName}&email=${state?.searchEmail}&mobile=${state?.searchMobile}&sort=${state?.sort}&limit=${state?.limit}&page=${state?.page}`,
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
// ==============Single User ======================
export const singleUserThunk = createAsyncThunk(
  'users/singleUserThunk',
  async (_id, thunkAPI) => {
    const cookies = Cookies.get('token')
    try {
      const response = await customFetch.get(`/authadmin/users/${_id}`, {
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
// ==============Delete User ======================
export const deleteUserThunk = createAsyncThunk(
  'users/deleteUserThunk',
  async (_id, thunkAPI) => {
    const cookies = Cookies.get('token')
    try {
      const response = await customFetch.delete(`/authadmin/users/${_id}`, {
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

export const deleteManyUsersThunk = createAsyncThunk(
  'appointment/deleteManyUsersThunk',
  async (data, thunkAPI) => {
    try {
      const response = await customFetch.patch(`/authadmin/users`, data, {
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
const usersSlice = createSlice({
  name: 'users',
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
      // register
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
      .addCase(usersThunk.pending, (state, { payload }) => {
        console.log('promise pending')
        state.isLoading = true
      })
      .addCase(usersThunk.fulfilled, (state, { payload }) => {
        console.log('promise fulfilled')
        console.log(payload)
        state.isLoading = false
      })
      .addCase(usersThunk.rejected, (state, { payload }) => {
        console.log('promise rejected')
        console.log(payload)
        state.isLoading = false
      })
      // ==========allUsersThunk===============
      .addCase(allUsersThunk.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(allUsersThunk.fulfilled, (state, { payload }) => {
        state.list = payload.list
        state.nbHits = payload.nbHits
        if (payload.nbHits < 10) {
          state.page = 1
        }
        state.isLoading = false
      })
      .addCase(allUsersThunk.rejected, (state, { payload }) => {
        console.log(payload)
        state.isLoading = false
      })
      // ===========singleUserThunk===========
      .addCase(singleUserThunk.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(singleUserThunk.fulfilled, (state, { payload }) => {
        addObjectInState(payload.result, state)
        state.isLoading = false
      })
      .addCase(singleUserThunk.rejected, (state, { payload }) => {
        toast.error(payload.msg)
        state.isLoading = false
      })
      // ===========deleteUserThunk===========
      .addCase(deleteUserThunk.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(deleteUserThunk.fulfilled, (state, { payload }) => {
        toast.success(payload.msg)
        state.refreshData = !state.refreshData
        state.isLoading = false
      })
      .addCase(deleteUserThunk.rejected, (state, { payload }) => {
        toast.error(payload.msg)
        state.isLoading = false
      })
      // ===========deleteManyUsersThunk===========
      .addCase(deleteManyUsersThunk.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(deleteManyUsersThunk.fulfilled, (state, { payload }) => {
        toast.success(payload.msg)
        state.refreshData = !state.refreshData
        state.isLoading = false
      })
      .addCase(deleteManyUsersThunk.rejected, (state, { payload }) => {
        toast.error(payload.msg)
        state.isLoading = false
      })
  },
})
export const { createFunction, getStateValues, clearState, next, prev, index } =
  usersSlice.actions
export default usersSlice.reducer
