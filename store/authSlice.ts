import { createSlice } from "@reduxjs/toolkit";

// ✅ FIXED: Safe helper function to get initial token
const getInitialToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: getInitialToken(), // ✅ FIXED: Use safe function
    isAdminLoggedIn: !!getInitialToken(), // ✅ FIXED: Use safe function
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.isAdminLoggedIn = true;
      // ✅ FIXED: Only set localStorage on client side
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload.token);
      }
    },
    logoutSuccess: (state) => {
      state.token = null;
      state.isAdminLoggedIn = false;
      // ✅ FIXED: Only remove localStorage on client side
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
