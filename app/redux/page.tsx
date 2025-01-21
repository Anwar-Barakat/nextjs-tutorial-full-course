"use client";
import React from "react";
import { Provider } from "react-redux";
import store from "@/stores/store";
import CakeView from "@/app/redux/_components/CakeView";
import IceCreamView from "./_components/IceCreamView";

const ReduxPage = () => {
    return (
        <Provider store={store}>
            <div>
                <CakeView />
                <IceCreamView />
            </div>
        </Provider>
    );
};

export default ReduxPage;
