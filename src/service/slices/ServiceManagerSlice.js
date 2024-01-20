import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance } from './configAPI'
const initialState = {
  dataServiceFeatures: {},
  dataRegister: [],
  dataAdress: [],
  isChanged: false,
  isLoading: false,
  resetRequest: false,
  keyEdit: '',
}
const ServiceManagerSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //lấy thông tin gói dịch vụ
      .addCase(getServicePackage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getServicePackage.fulfilled, (state, action) => {
        if (action.payload.status === 200 || action.payload.status === 1) {
          state.dataServiceFeatures = action.payload.data
        }
      })
      .addCase(getServicePackage.rejected, (state) => {
        state.isNotify = false
      })
  },
})
//request lấy thông tin gói dịch vụ
export const getServicePackage = createAsyncThunk(
  'service/getServicePackage',
  async () => {
    try {
      const res = await instance.get(`/v2/package/general`)
      return res.data
    } catch (error) {
      console.log(error)
      return error.reponse.data
    }
  }
)
export default ServiceManagerSlice
export const {} = ServiceManagerSlice.actions
