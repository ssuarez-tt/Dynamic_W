import {createSlice} from '@reduxjs/toolkit'

/* The active filters are UI state: they describe the current view, not a
   property of a print. Colour and favourites can both be active, and Catalog
   intersects them so users can ask for (for example) blue favourites. */
const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    colourFilter: 'all',
    favouritesOnly: false,
  },
  reducers: {
    filterChanged(state, action) {
      state.colourFilter = action.payload
    },
    favouritesFilterToggled(state) {
      state.favouritesOnly = !state.favouritesOnly
    },
  },
})

export const {filterChanged, favouritesFilterToggled} = uiSlice.actions
export const selectColourFilter = (state) => state.ui.colourFilter
export const selectFavouritesOnly = (state) => state.ui.favouritesOnly

export default uiSlice.reducer
