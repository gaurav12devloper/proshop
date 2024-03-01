import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({ //it will enject endpoint into the apiSlice
    endpoints:(builder) => ({ 
        getProducts: builder.query({ // query is used to fetch data from the server
            query: () => ({
            url : PRODUCTS_URL, // the url to fetch the data from
        }),
        keepUnusedDataFor:5 // keep the data for 5 minutes even if it is not being used(stored data in catche for 5 minutes)
     }),
     getProductDetails:builder.query({
        query: (productId) => ({ url: `${PRODUCTS_URL}/${productId}`}),
        keepUnusedDataFor:5
     }),

    }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productApiSlice; // export the hook to use it in the component
