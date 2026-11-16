import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    // Define your initial state here
    name: '',
    price: 0,
  },
  reducers: {
    // reducer is a function that updates the state based on the action dispatched
    changeName: (state, action) => {
      state.name = action.payload;
    },
    changePrice: (state, action) => {
      state.price = action.payload;
    },
  },
});


export const {changeName, changePrice} = formSlice.actions

export const formReducer = formSlice.reducer