import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL

export const fetchCustomerRecords = createAsyncThunk(
  'contacts/fetchCustomerRecords',
  async ({ page, itemsPerPage }) => {
    const response = await axios.get(`${apiUrl}/contact/get_contact`, {
      params: { page, resultPerPage: itemsPerPage },
    })
    return response.data
  },
)

const customerSlice = createSlice({
  name: 'contacts',
  initialState: {
    customerRecords: [],
    pageCount: 0,
    currentPage: 1,
    itemsPerPage: 10,
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setItemsPerPage(state, action) {
      state.itemsPerPage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerRecords.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCustomerRecords.fulfilled, (state, action) => {
        state.loading = false
        state.pageCount = action.payload.pageCount
        state.customerRecords = action.payload.result.filter((record) => record.status === 'active')
      })
      .addCase(fetchCustomerRecords.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { setCurrentPage, setItemsPerPage } = customerSlice.actions

export default customerSlice.reducer
