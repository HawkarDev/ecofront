// authSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null, // Store the token
    isAdminLoggedIn: !!localStorage.getItem("token"), // Check if token exists
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token; // Save the token in Redux state
      state.isAdminLoggedIn = true;
      localStorage.setItem("token", action.payload.token); // Persist token in localStorage
    },
    logoutSuccess: (state) => {
      state.token = null;
      state.isAdminLoggedIn = false;
      localStorage.removeItem("token"); // Remove token from localStorage
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;