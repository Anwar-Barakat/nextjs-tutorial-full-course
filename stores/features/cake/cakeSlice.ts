import { createSlice } from "@reduxjs/toolkit";

interface CakeState {
  numOfCakes: number;
}

const initialState: CakeState = {
  numOfCakes: 10,
};

const cakeSlice = createSlice({
  name: "cake",
  initialState,
  reducers: {
    orderCake: (state, action) => {
      state.numOfCakes -= action.payload;
    },
    restockCake: (state, action) => {
      state.numOfCakes += action.payload;
    },
  },
});

export const { orderCake } = cakeSlice.actions;
export default cakeSlice.reducer;
