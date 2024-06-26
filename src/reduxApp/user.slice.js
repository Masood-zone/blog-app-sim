import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: null,
    name: "",
    email: "",
    password: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = initialState.user;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
