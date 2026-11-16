import {createSlice} from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    colourFilter: 'all',
    favouritesOnly: false,
  },
  reducers: {
    filterChanged(state, action) {
      state.colourFilter = action.payload
      state.favouritesOnly = false
    },
    favouritesFilterToggled(state) {
      state.favouritesOnly = !state.favouritesOnly
      state.colourFilter = 'all'
    },
  },
})

export const {filterChanged, favouritesFilterToggled} = uiSlice.actions
export const selectColourFilter = (state) => state.ui.colourFilter
export const selectFavouritesOnly = (state) => state.ui.favouritesOnly

export default uiSlice.reducer
