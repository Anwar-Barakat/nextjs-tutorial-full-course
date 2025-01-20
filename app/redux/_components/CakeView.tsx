"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { orderCake } from "@/stores/features/cake/cakeSlice";
import store from "@/stores/store";

const CakeView = () => {
  const [value, setValue] = useState(1);
  const numOfCakes = useSelector(
    (state: ReturnType<typeof store.getState>) => state.cake.numOfCakes
  );
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Number of cakes - {numOfCakes}</h2>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
      />
      <button onClick={() => dispatch(orderCake(value))}>Order cake</button>
    </div>
  );
};

export default CakeView;
