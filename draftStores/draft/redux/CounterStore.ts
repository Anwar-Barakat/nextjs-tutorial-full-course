import { createSlice } from "@reduxjs/toolkit";
const counterStore = createSlice({
  name: "counter",
  initialState: {
    count: 0,
  },
  reducers: {
    increment: (state) => {
      state.count++;
    },
  },
});

export default counterStore.reducer;
