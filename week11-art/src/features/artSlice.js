import {createSelector, createSlice, nanoid} from '@reduxjs/toolkit'

/* The selected sort order is state because the user changes it. The sorted
   array is derived from the collection and order, so it is never stored. */
const artSlice = createSlice({
  name: 'art',
  initialState: {
    searchTerm: '',
    sortOrder: 'desc',
    data: [],
  },
  reducers: {
    changeSearchTerm(state, action) {
      state.searchTerm = action.payload
    },
    sortOrderChanged(state, action) {
      state.sortOrder = action.payload
    },
    addArt(state, action) {
      state.data.push({
        id: nanoid(),
        name: action.payload.name,
        price: action.payload.price,
      })
    },
    removeArt(state, action) {
      state.data = state.data.filter((art) => art.id !== action.payload)
    },
    clearCollection(state) {
      state.data = []
    },
  },
})

export const {
  changeSearchTerm,
  sortOrderChanged,
  addArt,
  removeArt,
  clearCollection,
} = artSlice.actions

const selectArtData = (state) => state.art.data
const selectSearchTerm = (state) => state.art.searchTerm
const selectSortOrder = (state) => state.art.sortOrder

export const selectVisibleArt = createSelector(
  [selectArtData, selectSearchTerm, selectSortOrder],
  (data, searchTerm, sortOrder) => {
    const query = searchTerm.trim().toLowerCase()
    return data
      .filter((art) => art.name.toLowerCase().includes(query))
      .sort((first, second) =>
        sortOrder === 'desc'
          ? second.price - first.price
          : first.price - second.price
      )
  }
)

export const selectVisibleArtCount = createSelector(
  [selectVisibleArt],
  (visible) => visible.length
)

export const selectTotalValue = createSelector(
  [selectVisibleArt],
  (visible) => visible.reduce((total, art) => total + art.price, 0)
)

export {selectSortOrder}
export const selectCollectionIsEmpty = (state) => state.art.data.length === 0

export const artReducer = artSlice.reducer
