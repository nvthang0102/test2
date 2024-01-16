import { configureStore } from '@reduxjs/toolkit'
import ProvinceSlice from '../slices/ProvinceSlice'
import AccountManagerSlice from '../slices/AccountManagerSlice'
const store = configureStore({
  reducer: {
    province: ProvinceSlice.reducer,
    account: AccountManagerSlice.reducer,
  },
})

export default store
