import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  numOfIceCreams: 20,
};

const iceCreamSlice = createSlice({
  name: "iceCream",
  initialState,
  reducers: {
    orderIceCream: (state, action) => {
      state.numOfIceCreams -= action.payload;
    },
    restockIceCream: (state, action) => {
      state.numOfIceCreams += action.payload;
    },
  },
});

export const { orderIceCream, restockIceCream } = iceCreamSlice.actions;
export default iceCreamSlice.reducer;
