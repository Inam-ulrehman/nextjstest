import { customFetch } from '@/utils/axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  dashboardSidebar: true,
  isLoading: false,
}
export const globalsThunk = createAsyncThunk(
  'globals/globalsThunk',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get('/products/static')

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

const globalsSlice = createSlice({
  name: 'globals',
  initialState,
  reducers: {
    createFunction: (state, { payload }) => {
      console.log('function call')
    },
    getStateValues: (state, { payload }) => {
      const { name, value } = payload
      state[name] = value
    },
    toggleDashboardSidebar: (state, { payload }) => {
      state.dashboardSidebar = !state.dashboardSidebar
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(globalsThunk.pending, (state, { payload }) => {
        console.log('promise pending')
        state.isLoading = true
      })
      .addCase(globalsThunk.fulfilled, (state, { payload }) => {
        console.log('promise fulfilled')
        console.log(payload)
        state.isLoading = false
      })
      .addCase(globalsThunk.rejected, (state, { payload }) => {
        console.log('promise rejected')
        console.log(payload)
        state.isLoading = false
      })
  },
})
export const { createFunction, getStateValues, toggleDashboardSidebar } =
  globalsSlice.actions
export default globalsSlice.reducer
