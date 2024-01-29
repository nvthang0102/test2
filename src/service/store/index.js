import { configureStore } from '@reduxjs/toolkit'
import ProvinceSlice from '../slices/ProvinceSlice'
import AccountManagerSlice from '../slices/AccountManagerSlice'
import CommonSlice from '../slices/CommonSlice'
import ServiceManagerSlice from '../slices/ServiceManagerSlice'
import CardManagerSlice from '../slices/CardManagerSlice'
import AddCardSlide from '../slices/AddCardSlide'
const store = configureStore({
  reducer: {
    province: ProvinceSlice.reducer,
    account: AccountManagerSlice.reducer,
 	common: CommonSlice.reducer,
    service: ServiceManagerSlice.reducer,
    cardManager: CardManagerSlice.reducer,
    addCard: AddCardSlide.reducer
  },
})

export default store
