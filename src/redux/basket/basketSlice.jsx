import { createSlice, current } from "@reduxjs/toolkit";


export const basketSlice = createSlice({
    name: "basket",
    initialState: {
        data: [
        ],
        displayBill: false,
        displayBasket: true,
    },
    reducers: {
        addProduct: (state, action) => {
            const { product, number, currency } = action.payload;
            //console.log(currency);
            const isProductInBasket = state.data.find(item => item.product.id === product.id && item.currency === currency ? item : false)


            if (isProductInBasket === undefined) {
                state.data.push({ product, number: Number(number), currency })
            }
            else {
                //current-> proxy covert
                const productInBasket = current(isProductInBasket)
                const newBasket = state.data.map(item => {
                    if (item.product.id === productInBasket.product.id && item.currency === productInBasket.currency) {
                        item.number += Number(number)
                        return item
                    }
                    else return item
                })
                state.data = newBasket

            }
        },
        sellProduct: (state, action) => {
            const { product, number, currency } = action.payload;
            const productInBasket = current(state.data.find(item => item.product.id === product.id && item.currency === currency ? item : false))

            let newBasket = state.data.map(item => {
                //console.log(item.product);
                if (item.product.id === productInBasket.product.id && item.currency === currency) {
                    item.number -= Number(number)
                    return item
                } else return item
            })
            state.data = newBasket.filter(item => item.number > 0)

        },
        deleleteProductInBasket: (state, action) => {
            const { product, currency } = action.payload;
            let newBasket = state.data.map(item => {
                if (item.product.id === product.id && item.currency === currency) {
                    item.number -= 1
                    return item
                } else return item
            })
            state.data = newBasket.filter(item => item.number > 0)
        },
        clearBasket: (state) => {
            state.data = [];
        },
        setDisplayBasket: (state, action) => {
            state.displayBasket = action.payload;
        },
        setDisplayBill: (state, action) => {
            state.displayBill = action.payload;
        }
    }
})

export const selectBasket = (state) => state.basket.data;

export const { addProduct, sellProduct, deleleteProductInBasket, clearBasket, setDisplayBasket, setDisplayBill } = basketSlice.actions;
export default basketSlice.reducer;