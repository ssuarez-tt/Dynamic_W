import {createSlice} from '@reduxjs/toolkit'

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: {ids: []},
  reducers: {
    favouriteToggled(state, action) {
      const id = action.payload
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((favouriteId) => favouriteId !== id)
      } else {
        state.ids.push(id)
      }
    },
  },
})

export const {favouriteToggled} = favouritesSlice.actions
export const selectFavouriteIds = (state) => state.favourites.ids
export const selectFavouriteCount = (state) => state.favourites.ids.length

export default favouritesSlice.reducer
