import {createSlice} from '@reduxjs/toolkit'

// The action type is 'favourites/favouriteToggled'; it adds or removes that
// print ID in state.favourites.ids. One toggle keeps membership logic in the
// reducer, so the button needs to send only the print ID.
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
