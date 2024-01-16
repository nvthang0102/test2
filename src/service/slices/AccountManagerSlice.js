import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance } from './configAPI'
const initialState = {
  dataAccountInfo: [],
  dataRegister: [],
  dataAdress: [],
  isLoading: false,
  resetRequest: false,
  keyEdit: '',
}
const AccountManagerSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setIsEdit: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      //lấy dữ liệu thông tin cá nhân
      .addCase(getUserInfo.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        if (action.payload.status === 200 || action.payload.status === 1) {
          state.dataAccountInfo = action.payload.data
        }
      })
      .addCase(getUserInfo.rejected, (state) => {
        state.isNotify = false
      })
      //lấy dữ liệu thông tin đăng ký
      .addCase(getRegisterInfo.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getRegisterInfo.fulfilled, (state, action) => {
        if (action.payload.status === 200 || action.payload.status === 1) {
          state.dataRegister = action.payload.data
        }
      })
      .addCase(getRegisterInfo.rejected, (state) => {
        state.isNotify = false
      })
      //lấy dữ liệu thông tin quản lý địa chỉ
      .addCase(getAdressManager.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAdressManager.fulfilled, (state, action) => {
        if (action.payload.status === 200 || action.payload.status === 1) {
          state.dataAdress = action.payload.data
        }
      })
      .addCase(getAdressManager.rejected, (state) => {
        state.isNotify = false
      })
  },
})
//lấy thông tin cá nhân
export const getUserInfo = createAsyncThunk('account/getUserInfo', async () => {
  try {
    const res = await instance.get(`/v2/user/getinfo`)
    return res.data
  } catch (error) {
    console.log(error)
    return error.reponse.data
  }
})
//lấy thông tin đăng ký
export const getRegisterInfo = createAsyncThunk(
  'account/getRegisterInfo',
  async () => {
    try {
      const res = await instance.get(`/v2/user/GetRegisterInfo`)
      return res.data
    } catch (error) {
      console.log(error)
      return error.reponse.data
    }
  }
)
// lấy thông tin quản lý địa chỉ
export const getAdressManager = createAsyncThunk(
  'account/getAdressManager',
  async () => {
    try {
      const res = await instance.get(`/v2/user/getListAddress`)
      return res.data
    } catch (error) {
      console.log(error)
      return error.reponse.data
    }
  }
)

export default AccountManagerSlice
export const {} = AccountManagerSlice.actions
