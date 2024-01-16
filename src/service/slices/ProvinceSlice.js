import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
  dataCity: [],
  dataDistrict: [],
  dataWard: [],
  isLoading: false,

  resetRequest: false,
}
const ProvinceSlice = createSlice({
  name: 'province',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCity.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCity.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.dataCity = action.payload.data
        }
      })
      .addCase(getCity.rejected, (state) => {
        state.isNotify = false
      })
      .addCase(getDistrict.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getDistrict.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.dataDistrict = action.payload.data.districts
          state.dataWard = []
        }
      })
      .addCase(getDistrict.rejected, (state) => {
        state.isNotify = false
      })
      .addCase(getWard.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getWard.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.dataWard = action.payload.data.wards
        }
      })
      .addCase(getWard.rejected, (state) => {
        state.isNotify = false
      })
  },
})
export const getCity = createAsyncThunk('province/getCity', async (data) => {
  try {
    const res = await axios.get(`https://provinces.open-api.vn/api/?depth=1`)
    return res
  } catch (error) {
    console.log(error)
    return error.reponse.data
  }
})
export const getDistrict = createAsyncThunk(
  'province/getDistrict',
  async (id) => {
    try {
      const res = await axios.get(
        `https://provinces.open-api.vn/api/p/${id}?depth=2`
      )
      return res
    } catch (error) {
      console.log(error)
      return error.reponse.data
    }
  }
)
export const getWard = createAsyncThunk('province/getWard', async (id) => {
  try {
    const res = await axios.get(
      `https://provinces.open-api.vn/api/d/${id}?depth=2`
    )
    return res
  } catch (error) {
    console.log(error)
    return error.reponse.data
  }
})

export default ProvinceSlice
export const {} = ProvinceSlice.actions
