import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const artSlice = createSlice({
  name: 'art',
  initialState: {
    searchTerm: '',
    data: [],
  },
  reducers: {
    changeSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    addArt: (state, action) => {
      // A SLICE CANNOT SEE ANOTHER SLICE'S STATE. The name and the price
      // live in formSlice, and there is no way to reach them from here.
      // So the component reads them and sends them in the payload.
      // Assume action.payload is {name: 'Mondrian, Composition II', price: 500}
        state.data.push({
            id: nanoid(),
            name: action.payload.name,
            price: action.payload.price,
        });
    },
    removeArt: (state, action) => {
      state.data = state.data.filter(item => item.id !== action.payload);
    },
  },
});

export const {changeSearchTerm, addArt, removeArt} = artSlice.actions
export default artSlice.reducer;