import {createSlice} from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {items: []},
  reducers: {
    itemAdded(state, action) {
      const print = action.payload
      const existing = state.items.find((item) => item.id === print.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({...print, quantity: 1})
      }
    },
    quantityIncreased(state, action) {
      const item = state.items.find((entry) => entry.id === action.payload)
      if (item) item.quantity += 1
    },
    quantityDecreased(state, action) {
      const item = state.items.find((entry) => entry.id === action.payload)
      if (!item) return
      if (item.quantity <= 1) {
        state.items = state.items.filter((entry) => entry.id !== action.payload)
      } else {
        item.quantity -= 1
      }
    },
    itemRemoved(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    cartCleared(state) {
      state.items = []
    },
  },
})

export const {
  itemAdded,
  quantityIncreased,
  quantityDecreased,
  itemRemoved,
  cartCleared,
} = cartSlice.actions

export const selectCartItems = (state) => state.cart.items
export const selectCartCount = (state) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0)
export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity * item.price, 0)

export default cartSlice.reducer
