import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({ //injectEndpoints is a function that takes in an object and returns an object
    endpoints:(builder) => ({
        getProducts: builder.query({
            query: () => ({
            url : PRODUCTS_URL, // the url to fetch the data from
        }),
        keepUnusedDataFor:5 // keep the data for 5 minutes even if it is not being used
     })
    }),
});

export const { useGetProdcutsQuery } = productApiSlice; // export the hook to use it in the component
