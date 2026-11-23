import {configureStore} from '@reduxjs/toolkit'
import cartReducer from './features/cartSlice'
import favouritesReducer from './features/favouritesSlice'
import uiReducer from './features/uiSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favourites: favouritesReducer,
    ui: uiReducer,
  },
})
