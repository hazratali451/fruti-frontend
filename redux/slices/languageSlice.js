import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "EN",
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguageDispatch: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguageDispatch } = languageSlice.actions;

export default languageSlice.reducer;
