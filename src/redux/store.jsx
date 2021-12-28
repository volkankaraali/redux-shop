import { configureStore } from "@reduxjs/toolkit";
import basketSlice from "./basket/basketSlice";
import shopsSlice from "./shops/shopsSlice";

export const store = configureStore({
    reducer: {
        shops: shopsSlice,
        basket: basketSlice,
    },
})