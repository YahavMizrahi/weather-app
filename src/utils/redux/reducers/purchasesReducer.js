import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const purchases = createSlice({
  name: "purchases",
  initialState,
  reducers: {
    addPurchases(state, action) {
      return state.concat(action.payload);
    },
  },
});

export const { addPurchases } = purchases.actions;

export default purchases.reducer;
