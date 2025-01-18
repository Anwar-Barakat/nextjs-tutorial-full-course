// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { api } from "../../../services/api";

// export const loginUser = createAsyncThunk(
//   "auth/login",
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await api.auth.login(credentials);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
