import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDispatch: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUserDispatch } = userSlice.actions;

// Add a callback parameter to setUserDispatch
export const setUser = (user, callback) => (dispatch) => {
  dispatch(setUserDispatch(user));

  // Call the callback function if provided
  if (callback) {
    callback();
  }
};

export default userSlice.reducer;
