// import { createSlice } from "@reduxjs/toolkit";

// interface AuthState {
//   user: any;
//   loading: boolean;
//   error: string | null;
//   isAuthenticated: boolean;
// }

// const initialState: AuthState = {
//   user: null,
//   loading: false,
//   error: null,
//   isAuthenticated: false,
// };

// export const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     loginSuccess: (state, action) => {
//       state.loading = false;
//       state.isAuthenticated = true;
//       state.user = action.payload;
//       state.error = null;
//     },
//     loginFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.isAuthenticated = false;
//       state.loading = false;
//       state.error = null;
//     },
//     updateUserProfile: (state, action) => {
//       state.user = { ...state.user, ...action.payload };
//     },
//   },
// });

// export const { loginSuccess, loginFailure, logout, updateUserProfile } =
//   authSlice.actions;

// export default authSlice.reducer;
