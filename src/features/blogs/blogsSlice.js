import { customFetch } from '@/utils/axios'
import { addObjectInState } from '@/utils/helper'
import { removeItemFromLocalStorage } from '@/utils/localStorage'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

const initialState = {
  // register
  heading: '',
  description: '',
  image: [],
  blogHeading: '',
  blogDescription: '',
  createdBy: '',
  createdAt: '',
  // Search
  searchHeading: '',
  searchDescription: '',
  searchBlogHeading: '',
  searchBlogDescription: '',
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
  removeImage: false,
  // Delete Many
  deleteMany: [],
  isLoading: false,
}
export const blogsThunk = createAsyncThunk(
  'blogs/blogsThunk',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get('/products/static')

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
//  ========create Blog=========
export const createBlogThunk = createAsyncThunk(
  'blogs/createBlogThunk',
  async (state, thunkAPI) => {
    const cookies = Cookies.get('token')

    try {
      const response = await customFetch.post('/authadmin/blogs', state, {
        headers: {
          Authorization: `Bearer ${cookies}`,
        },
      })
      thunkAPI.dispatch(clearState())
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
//======== Get All Blogs========
export const allBlogsThunk = createAsyncThunk(
  'blogs/allBlogsThunk',

  async (state, thunkAPI) => {
    try {
      const response = await customFetch.get(
        `/authadmin/blogs?searchHeading=${state?.searchHeading}&searchDescription=${state?.searchDescription}&searchBlogHeading=${state?.searchBlogHeading}&searchBlogDescription=${state?.searchBlogDescription}&sort=${state?.sort}&limit=${state?.limit}&page=${state?.page}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      )

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// ==============Single Blog ======================
export const singleBlogThunk = createAsyncThunk(
  'blogs/singleBlogThunk',
  async (_id, thunkAPI) => {
    const cookies = Cookies.get('token')
    try {
      const response = await customFetch.get(`/authadmin/blogs/${_id}`, {
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
// ============update Blog===========
export const updateBlogThunk = createAsyncThunk(
  'blogs/updateBlogThunk',
  async (state, thunkAPI) => {
    const cookies = Cookies.get('token')
    console.log(state)
    try {
      const response = await customFetch.patch(
        `/authadmin/blogs/${state._id}`,
        state,
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
// ==============Delete Blog ======================
export const deleteBlogThunk = createAsyncThunk(
  'blogs/deleteBlogThunk',
  async (_id, thunkAPI) => {
    try {
      const response = await customFetch.delete(`/authadmin/blogs/${_id}`, {
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
// ==== Delete Many ====

export const deleteManyBlogsThunk = createAsyncThunk(
  'appointment/deleteManyBlogsThunk',
  async (data, thunkAPI) => {
    const cookies = Cookies.get('token')
    try {
      const response = await customFetch.patch(`/authadmin/blogs`, data, {
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
const blogsSlice = createSlice({
  name: 'blogs',
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
      state.heading = ''
      state.description = ''
      state.image = []
      state.blogHeading = ''
      state.blogDescription = ''

      // search
      state.searchHeading = ''
      state.searchDescription = ''
      state.searchBlogHeading = ''
      state.searchBlogDescription = ''

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
      .addCase(blogsThunk.pending, (state, { payload }) => {
        console.log('promise pending')
        state.isLoading = true
      })
      .addCase(blogsThunk.fulfilled, (state, { payload }) => {
        console.log('promise fulfilled')
        console.log(payload)
        state.isLoading = false
      })
      .addCase(blogsThunk.rejected, (state, { payload }) => {
        console.log('promise rejected')
        console.log(payload)
        state.isLoading = false
      })
      //======= Create Blog Thunk ======
      .addCase(createBlogThunk.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(createBlogThunk.fulfilled, (state, { payload }) => {
        toast.success(payload.msg)
        removeItemFromLocalStorage('uploadImage')
        state.removeImage = !state.removeImage
        state.isLoading = false
      })
      .addCase(createBlogThunk.rejected, (state, { payload }) => {
        console.log(payload)

        state.isLoading = false
      })
      // ==========allBlogsThunk===============
      .addCase(allBlogsThunk.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(allBlogsThunk.fulfilled, (state, { payload }) => {
        state.list = payload.list
        state.nbHits = payload.nbHits
        if (payload.nbHits < 10) {
          state.page = 1
        }
        state.isLoading = false
      })
      .addCase(allBlogsThunk.rejected, (state, { payload }) => {
        console.log(payload)
        state.isLoading = false
      })
      // ===========singleBlogThunk===========
      .addCase(singleBlogThunk.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(singleBlogThunk.fulfilled, (state, { payload }) => {
        addObjectInState(payload.result, state)
        state.isLoading = false
      })
      .addCase(singleBlogThunk.rejected, (state, { payload }) => {
        toast.error(payload.msg)
        state.isLoading = false
      })
      // ===========updateBlogThunk===========
      .addCase(updateBlogThunk.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(updateBlogThunk.fulfilled, (state, { payload }) => {
        toast.success(payload.msg)
        removeItemFromLocalStorage('uploadImage')
        state.removeImage = !state.removeImage
        state.isLoading = false
      })
      .addCase(updateBlogThunk.rejected, (state, { payload }) => {
        toast.error(payload.msg)
        state.isLoading = false
      })
      // ===========deleteBlogThunk===========
      .addCase(deleteBlogThunk.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(deleteBlogThunk.fulfilled, (state, { payload }) => {
        toast.success(payload.msg)
        state.refreshData = !state.refreshData
        state.isLoading = false
      })
      .addCase(deleteBlogThunk.rejected, (state, { payload }) => {
        toast.error(payload.msg)
        state.isLoading = false
      })
      // ===========deleteManyBlogsThunk===========
      .addCase(deleteManyBlogsThunk.pending, (state, { payload }) => {
        state.isLoading = true
      })
      .addCase(deleteManyBlogsThunk.fulfilled, (state, { payload }) => {
        toast.success(payload.msg)
        state.refreshData = !state.refreshData
        state.isLoading = false
      })
      .addCase(deleteManyBlogsThunk.rejected, (state, { payload }) => {
        toast.error(payload.msg)
        state.isLoading = false
      })
  },
})
export const { createFunction, getStateValues, clearState, next, prev, index } =
  blogsSlice.actions
export default blogsSlice.reducer
