import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance } from './configAPI'

const initialState = {
    dataListCard: [],
    isLoading: false,
    error: '',
    resetRequest: false,
    responseDelete: {}


}
const CardManagerSlice = createSlice({
    name: 'CardManagerSlice',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getListCard.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getListCard.rejected, (state, actions) => {
                state.isLoading = false;
                state.error = actions.error
            })
            .addCase(getListCard.fulfilled, (state, actions) => {
                state.isLoading = false;
                state.dataListCard = actions.payload
            })
            .addCase(deleteCard.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteCard.rejected, (state, actions) => {
                state.isLoading = false;
                state.error = actions.error
            })
            .addCase(deleteCard.fulfilled, (state, actions) => {
                state.isLoading = false;
                state.responseDelete = actions.payload
            })
    }
})

export const getListCard = createAsyncThunk('CardManagerSlice/getListCard', async (params, thinkAPI) => {
    try {
        const res = await instance.get(`/v1/card/get-card`)
        return res.data
    } catch (error) {
        console.log(error)
        return error.reponse.data
    }
})

export const deleteCard = createAsyncThunk('CardManagerSlice/deleteCard', async (params, thinkAPI) => {
    try {
        const res = await instance.post(`/v1/card/delete-card`, params)
        return res.data
    } catch (error) {
        console.log(error)
        return error.reponse.data
    }
})

export default CardManagerSlice
export const { } = CardManagerSlice.actions