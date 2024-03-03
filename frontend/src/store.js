import { configureStore } from '@reduxjs/toolkit'; // configureStore is a function that takes in an object it provides a store
import cartSliceReducer from './slices/cartSlice'; 
import { apiSlice } from './slices/apiSlice';
import authSliceReducer from './slices/authSlice'; // we have to import the slice reducer to add it to the store
const store = configureStore({      
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,  // we have to add the apiSlice reducer to the store
        cart: cartSliceReducer,
        auth : authSliceReducer, // we have to add the slice reducer to the store
    },
    
     // Adding the api middleware enables caching, invalidation, polling,
     // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true, 
})

export default store;