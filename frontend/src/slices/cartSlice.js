import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";
const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')): {
    cartItems: [], // it is used to store the items that are added to the cart
};

const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers: {
        addToCart:(state,action) => {  // state is the current state of the cart and action is the data that we want to add to the cart
            const item=action.payload;
            const existItem=state.cartItems.find(x => x._id===item._id);
            
            if(existItem){
                state.cartItems=state.cartItems.map((x)=> x._id===existItem._id ? item : x); // if item is already in the cart then update the item
            }
            else {
                state.cartItems = [...state.cartItems,item]; // if item is not in the cart then add the item to the cart
            }

            return updateCart(state);

        },
        removeFromCart:(state,action) =>{
            state.cartItems=state.cartItems.filter((x)=>x._id!==action.payload);
            return updateCart(state);
        }
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;