import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance } from './configAPI'
import { setNotify } from './CommonSlice'
const initialState = {
  dataAccountInfo: [],
  dataRegister: [],
  dataAdress: [],
  isChanged: false,
  isLoading: false,
  resetRequest: false,
  keyEdit: '',
  isAddAddess: false,
}
const AccountManagerSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setIsEdit: (state, action) => {
      state.keyEdit = action.payload.keyEdit
      state.isChanged = action.payload.isChanged
    },
    setIsAddAddess: (state, action) => {
      state.isAddAddess = action.payload
    },
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
          state.resetRequest = false
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
          state.resetRequest = false
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
          state.resetRequest = false
        }
      })
      .addCase(getAdressManager.rejected, (state) => {
        state.isNotify = false
      })
      // cập nhật thông tin cá nhân
      .addCase(updateUserInfo.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        if (action.payload.status === 200 || action.payload.status === 1) {
          state.isChanged = false
          state.keyEdit = ''
          state.resetRequest = true
        }
      })
      .addCase(updateUserInfo.rejected, (state) => {
        state.isNotify = false
      })
      //thêm mới địa chỉ
      .addCase(addAddress.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        if (action.payload.status === 200 || action.payload.status === 1) {
          state.resetRequest = true
          state.isLoading = false
        }
      })
      .addCase(addAddress.rejected, (state) => {
        state.isNotify = false
      })
      //thêm mới địa chỉ
      .addCase(updateAddress.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        if (action.payload.status === 200 || action.payload.status === 1) {
          state.resetRequest = true
          state.isLoading = false
        }
      })
      .addCase(updateAddress.rejected, (state) => {
        state.isNotify = false
      })
      // xóa thông tin địa chỉ
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        if (action.payload.status === 200 || action.payload.status === 1) {
          state.resetRequest = true
          state.isLoading = false
        }
      })
      .addCase(deleteAddress.rejected, (state) => {
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
// request chỉnh sửa thông tin cá nhân

//request chỉnh sửa thông tin đăng ký
export const updateAddress = createAsyncThunk(
  'account/updateAddress',
  async (body, thunkAPI) => {
    try {
      const res = await instance.post(`/v2/user/editAddress`, body)
      if (res.data.status === 1 || res.data.status === 200) {
        thunkAPI.dispatch(
          setNotify({
            isNotify: true,
            msg: 'Cập nhật dữ liệu thành công',
            type: 'success',
          })
        )
      } else {
        thunkAPI.dispatch(
          setNotify({
            isNotify: true,
            msg: 'Lỗi server',
            type: 'error',
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
// request thêm mới địa chỉ
export const addAddress = createAsyncThunk(
  'account/addAddress',
  async (body, thunkAPI) => {
    try {
      const res = await instance.post(`/v2/user/addAddress`, body)
      if (res.data.status) {
        thunkAPI.dispatch(
          setNotify({
            isNotify: true,
            msg: 'Cập nhật dữ liệu thành công',
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

// request chỉnh sửa địa chỉ
export const updateUserInfo = createAsyncThunk(
  'account/updateUserInfo',
  async (body, thunkAPI) => {
    try {
      const res = await instance.post(`/v2/user/updateInfo`, body)
      if (res.data.status === 1 || res.data.status === 200) {
        thunkAPI.dispatch(
          setNotify({
            isNotify: true,
            msg: 'Cập nhật dữ liệu thành công',
            type: 'success',
          })
        )
      } else {
        thunkAPI.dispatch(
          setNotify({
            isNotify: true,
            msg: 'Lỗi server',
            type: 'error',
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
//request xóa địa chỉ
export const deleteAddress = createAsyncThunk(
  'account/deleteAddress',
  async (id, thunkAPI) => {
    try {
      const res = await instance.delete(`v2/user/deleteAddress?addressID=${id}`)
      if (res.data.status === 1 || res.data.status === 200) {
        thunkAPI.dispatch(
          setNotify({
            isNotify: true,
            msg: 'Xóa địa chỉ thành công',
            type: 'success',
          })
        )
      } else {
        thunkAPI.dispatch(
          setNotify({
            isNotify: true,
            msg: 'Lỗi server',
            type: 'error',
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

export default AccountManagerSlice
export const { setIsEdit } = AccountManagerSlice.actions
