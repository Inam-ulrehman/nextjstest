import { customFetch } from '@/utils/axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

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
export const samplesThunk = createAsyncThunk(
  'samples/samplesThunk',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get('/products/static')

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
//======== Get All Samples========
export const allSamplesThunk = createAsyncThunk(
  'samples/allSamplesThunk',

  async (state, thunkAPI) => {
    const cookies = Cookies.get('token')
    try {
      const response = await customFetch.get(
        `/authadmin/samples?name=${state?.searchName}&email=${state?.searchEmail}&mobile=${state?.searchMobile}&sort=${state?.sort}&limit=${state?.limit}&page=${state?.page}`,
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
// ==============Single Sample ======================
export const singleSampleThunk = createAsyncThunk(
  'samples/singleSampleThunk',
  async (_id, thunkAPI) => {
    try {
      const response = await customFetch.get(`/authadmin/samples/${_id}`, {
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
// ==============Delete Sample ======================
export const deleteSampleThunk = createAsyncThunk(
  'samples/deleteSampleThunk',
  async (_id, thunkAPI) => {
    const cookies = Cookies.get('token')
    try {
      const response = await customFetch.delete(`/authadmin/samples/${_id}`, {
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

export const deleteManySamplesThunk = createAsyncThunk(
  'appointment/deleteManySamplesThunk',
  async (data, thunkAPI) => {
    const cookies = Cookies.get('token')
    try {
      const response = await customFetch.patch(`/authadmin/samples`, data, {
        headers: {
          Authorization: `Bearer ${cookies}`,
        },
      })
      return response.data
    } catch (error) {
      console.log(error.response)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
const samplesSlice = createSlice({
  name: 'samples',
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
      state.name = ''
      state.email = ''
      state.email = ''
      state.mobile = ''

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
      .addCase(samplesThunk.pending, (state, { payload }) => {
        console.log('promise pending')
        state.isLoading = true
      })
      .addCase(samplesThunk.fulfilled, (state, { payload }) => {
        console.log('promise fulfilled')
        console.log(payload)
        state.isLoading = false
      })
      .addCase(samplesThunk.rejected, (state, { payload }) => {
        console.log('promise rejected')
        console.log(payload)
        state.isLoading = false
      })
      // ==========allSamplesThunk===============
      .addCase(allSamplesThunk.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(allSamplesThunk.fulfilled, (state, { payload }) => {
        state.list = payload.list
        state.nbHits = payload.nbHits
        if (payload.nbHits < 10) {
          state.page = 1
        }
        state.isLoading = false
      })
      .addCase(allSamplesThunk.rejected, (state, { payload }) => {
        console.log(payload)
        state.isLoading = false
      })
      // ===========singleSampleThunk===========
      .addCase(singleSampleThunk.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(singleSampleThunk.fulfilled, (state, { payload }) => {
        addObjectInState(payload.result, state)
        state.isLoading = false
      })
      .addCase(singleSampleThunk.rejected, (state, { payload }) => {
        toast.error(payload.msg)
        state.isLoading = false
      })
      // ===========deleteSampleThunk===========
      .addCase(deleteSampleThunk.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(deleteSampleThunk.fulfilled, (state, { payload }) => {
        toast.success(payload.msg)
        state.refreshData = !state.refreshData
        state.isLoading = false
      })
      .addCase(deleteSampleThunk.rejected, (state, { payload }) => {
        toast.error(payload.msg)
        state.isLoading = false
      })
      // ===========deleteManySamplesThunk===========
      .addCase(deleteManySamplesThunk.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(deleteManySamplesThunk.fulfilled, (state, { payload }) => {
        toast.success(payload.msg)
        state.refreshData = !state.refreshData
        state.isLoading = false
      })
      .addCase(deleteManySamplesThunk.rejected, (state, { payload }) => {
        toast.error(payload.msg)
        state.isLoading = false
      })
  },
})
export const { createFunction, getStateValues, clearState, next, prev, index } =
  samplesSlice.actions
export default samplesSlice.reducer
