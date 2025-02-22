import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAdminLoggedIn: !!localStorage.getItem("adminToken"), // Check if token exists
  },
  reducers: {
    loginSuccess: (state) => {
      state.isAdminLoggedIn = true;
    },
    logoutSuccess: (state) => {
      state.isAdminLoggedIn = false;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;