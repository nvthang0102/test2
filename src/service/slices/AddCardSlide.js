import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance } from './configAPI'
import { v4 as uuidv4 } from 'uuid'
import { setNotify } from './CommonSlice'

const initialState = {
  dataListCard: [],
  isLoading: false,
  error: '',
  resetRequest: false,
}
const AddCardSlide = createSlice({
  name: 'AddCardSlide',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCard.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addCard.rejected, (state, actions) => {
        state.isLoading = false
        state.error = actions.error
      })
      .addCase(addCard.fulfilled, (state, actions) => {
        state.isLoading = false
        state.resetRequest = actions.payload
      })
  },
})

export const addCard = createAsyncThunk(
  'AddCardSlide/add-card',
  async (params, thinkAPI) => {
    try {
      const formData = new FormData()
      formData.append('alignMent', params.alignMent)
      formData.append('enableFront', params.enableFront)
      formData.append('enableLogo', params.enableLogo)
      formData.append('fontColor', params.fontColor)
      formData.append('fontFamily', params.fontFamily)
      formData.append('nameCardBack', params.nameCardBack)
      formData.append('nameCardFront', params.nameCardFront)
      formData.append('backgroundKey', params?.background?.key)
      if (params.background?.key === 'image' && params.enableFront) {
        const newUuid = uuidv4()
        const uuidString = `${String(newUuid)}.${params?.background?.fileName}`
        console.log('uuidString', uuidString)
        console.log(params.background.value)
        const response = await fetch(params.background.value)
        const blob = await response.blob()
        formData.append('backgroundFile', blob, uuidString)
      } else {
        formData.append('backgroundColor', params.background.value)
      }
      formData.append('logoKey', params?.logo?.key)
      if (params?.logo && params.enableLogo) {
        const newUuid = uuidv4()
        const uuidString = `${String(newUuid)}.${params.logo.fileName}`
        const response = await fetch(params.logo.value)
        const blob = await response.blob()
        formData.append('logoFile', blob, uuidString)
      }

      const res = await instance.post('/v2/card/add-card', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      thinkAPI.dispatch(
        setNotify({
          isNotify: true,
          msg: 'Thêm thẻ thành công!',
          type: 'success',
        })
      )
      return res.data
    } catch (error) {
      console.log(error)
      return error.reponse.data
    }
  }
)

export default AddCardSlide
export const {} = AddCardSlide.actions
