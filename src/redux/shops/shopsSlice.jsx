import { createSlice } from "@reduxjs/toolkit";
import productsData from "../../products.json"
export const shopsSlice = createSlice({
    name: "shops",
    initialState: {
        products: productsData,
        currency: "",
        money: 1000000,
    },
    reducers: {
        setCurrency: (state, actions) => {
            state.currency = actions.payload;
        },

    }
})

export const selectProducts = (state) => state.shops.products;

export const { setCurrency } = shopsSlice.actions;
export default shopsSlice.reducer;