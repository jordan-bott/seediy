import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "tokenToken",
  initialState: {
    value: document.cookie,
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { set } = tokenSlice.actions;

export default tokenSlice.reducer;
