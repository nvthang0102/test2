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
  reducers: {
    resetState: (state) => {
      state.dataCity = []
      state.dataDistrict = []
      state.dataWard = []
      state.isLoading = false
      state.resetRequest = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCity.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCity.fulfilled, (state, action) => {
        
          state.dataCity =action.payload.results
        
      })
      .addCase(getCity.rejected, (state) => {
        state.isNotify = false
      })
      .addCase(getDistrict.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getDistrict.fulfilled, (state, action) => {
          state.dataDistrict = action.payload.results
          state.dataWard = []
      })
      .addCase(getDistrict.rejected, (state) => {
        state.isNotify = false
      })
      .addCase(getWard.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getWard.fulfilled, (state, action) => {
          state.dataWard = action.payload.results
      })
      .addCase(getWard.rejected, (state) => {
        state.isNotify = false
      })
  },
})
export const getCity = createAsyncThunk('province/getCity', async (data) => {
  try {
    const res = await axios.get(`https://vnprovinces.pythonanywhere.com/api/provinces/?basic=true&limit=100`)
    return res.data
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
        `https://vnprovinces.pythonanywhere.com/api/districts/?province_id=${id}&basic=true&limit=100`
        )
        return res.data
    } catch (error) {
      console.log(error)
      return error.reponse.data
    }
  }
)
export const getWard = createAsyncThunk('province/getWard', async (id) => {
  try {
    const res = await axios.get(
      `https://vnprovinces.pythonanywhere.com/api/wards/?district_id=${id}&basic=true&limit=100`
      
    )
    return res.data
  } catch (error) {
    console.log(error)
    return error.reponse.data
  }
})

export default ProvinceSlice
export const { resetState } = ProvinceSlice.actions
