import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setloadingDispatch: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setloadingDispatch } = loadingSlice.actions;

// Add a callback parameter to setloadingDispatch
export const setloading = (loading, callback) => (dispatch) => {
  dispatch(setloadingDispatch(loading));

  // Call the callback function if provided
  if (callback) {
    callback();
  }
};

export default loadingSlice.reducer;
