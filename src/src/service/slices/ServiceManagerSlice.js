import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance } from './configAPI'
import { setNotify } from './CommonSlice'
const initialState = {
  dataServiceFeatures: {},
  dataInfo: [],
  dataStogage: [],
  dataPaymentStorage: [],
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
      //lấy thông tin tính năng gói dịch vụ
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
      //lấy thông tin gói dịch vụ đang sử dụng
      .addCase(getPackageInfo.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPackageInfo.fulfilled, (state, action) => {
        if (action.payload.status === 200 || action.payload.status === 1) {
          state.dataInfo = action.payload.data
        }
      })
      .addCase(getPackageInfo.rejected, (state) => {
        state.isNotify = false
      })
      //lấy giá trị dung lượng lưu trữ gói dịch vụ
      .addCase(getCongifStorage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCongifStorage.fulfilled, (state, action) => {
        if (action.payload.status === 200 || action.payload.status === 1) {
          state.dataStogage = action.payload.data
        }
      })
      .addCase(getCongifStorage.rejected, (state) => {
        state.isNotify = false
      })
      //lấy giá trị dung lượng lưu trữ gói dịch vụ
      .addCase(getPaymentStorage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPaymentStorage.fulfilled, (state, action) => {
        if (action.payload.status === 200 || action.payload.status === 1) {
          state.dataPaymentStorage = action.payload.data
        }
      })
      .addCase(getPaymentStorage.rejected, (state) => {
        state.isNotify = false
      })
  },
})
//request lấy thông tin tính năng gói dịch vụ
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
//request lấy thông tin gói dịch vụ
export const getPackageInfo = createAsyncThunk(
  'service/getPackageInfo',
  async () => {
    try {
      const res = await instance.get(`/v2/package/Using`)
      return res.data
    } catch (error) {
      console.log(error)
      return error.reponse.data
    }
  }
)
//request lấy giá trị dung lượng lưu trữ gói dịch vụ
export const getCongifStorage = createAsyncThunk(
  'service/getCongifStorage',
  async () => {
    try {
      const res = await instance.get(`/v2/package/storage`)
      return res.data
    } catch (error) {
      console.log(error)
      return error.reponse.data
    }
  }
)
//request lấy giá trị dung lượng lưu trữ gói dịch vụ
export const getPaymentStorage = createAsyncThunk(
  'service/getPaymentStorage',
  async (value) => {
    console.log(value)
    try {
      const res = await instance.get(
        `/v2/package/DropdownPaymentCycle?storage=${value}`
      )
      return res.data
    } catch (error) {
      console.log(error)
      return error.reponse.data
    }
  }
)
//request lấy giá trị dung lượng lưu trữ gói dịch vụ
export const postFeatureRequire = createAsyncThunk(
  'service/postFeatureRequire',
  async (data, thunkAPI) => {
    try {
      const res = await instance.post(`/v2/package/RequestFeature`, data)
      if (res.data.status) {
        thunkAPI.dispatch(
          setNotify({
            isNotify: true,
            msg: 'Cảm ơn bạn đã gửi thông tin!',
            type: 'success',
          })
        )
      } else {
        thunkAPI.dispatch(
          setNotify({
            isNotify: true,
            msg: res.data.message,
            type: 'success',
          })
        )
      }
      return res.data
    } catch (error) {
      console.log(error)
      return error.reponse.data
    }
  }
)
export default ServiceManagerSlice
export const {} = ServiceManagerSlice.actions
