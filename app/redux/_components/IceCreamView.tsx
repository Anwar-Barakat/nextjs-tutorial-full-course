"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { orderIceCream, restockIceCream } from "@/stores/features/ice-cream/iceCreamSlice";
import store from "@/stores/store";

const IceCreamView = () => {
  const numOfIceCreams = useSelector((state: ReturnType<typeof store.getState>) => state.iceCream.numOfIceCreams);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Number of ice creams - {numOfIceCreams}</h2>
      <button onClick={() => dispatch(orderIceCream(1))}>Order ice cream</button>
      <button onClick={() => dispatch(restockIceCream(10))}>Restock ice creams</button>
    </div>
    )
}

export default IceCreamView
