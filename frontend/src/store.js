import { configureStore } from '@reduxjs/toolkit'; // configureStore is a function that takes in an object it provides a store
import { apiSlice } from './slices/apiSlice';
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer, // Add the apiSlice reducer under the "api" namespace
    }, // reducer is an object that contains all the reducers in our application
    
     // Adding the api middleware enables caching, invalidation, polling,
     // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true, 
})

export default store;