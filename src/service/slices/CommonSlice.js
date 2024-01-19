import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  isNotify: false,
  msg: '',
  typeNotify: 'success',
}
const CommonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setNotify: (state, action) => {
      state.isNotify = action.payload.isNotify
      state.msg = action.payload.msg
      state.typeNotify = action.payload.type
    },
  },
  extraReducers: (builder) => {},
})

export default CommonSlice
export const { setNotify } = CommonSlice.actions
