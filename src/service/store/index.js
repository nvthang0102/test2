import { configureStore } from '@reduxjs/toolkit'
import ProvinceSlice from '../slices/ProvinceSlice'
import AccountManagerSlice from '../slices/AccountManagerSlice'
import CommonSlice from '../slices/CommonSlice'
import ServiceManagerSlice from '../slices/ServiceManagerSlice'
const store = configureStore({
  reducer: {
    province: ProvinceSlice.reducer,
    account: AccountManagerSlice.reducer,
    common: CommonSlice.reducer,
    service: ServiceManagerSlice.reducer,
  },
})

export default store
