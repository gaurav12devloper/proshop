import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({ //it will enject endpoint into the apiSlice
    endpoints:(builder) => ({ 
        getProducts: builder.query({ // query is used to fetch data from the server
            query: () => ({
            url : PRODUCTS_URL, // the url to fetch the data from
        }),
        keepUnusedDataFor:5, // keep the data for 5 minutes even if it is not being used(stored data in catche for 5 minutes)
        providesTags: ['products'],
    }),
     getProductDetails:builder.query({
        query: (productId) => ({ url: `${PRODUCTS_URL}/${productId}`}),
        keepUnusedDataFor:5
     }),
     createProduct:builder.mutation({
        query: (product) => ({
            url: PRODUCTS_URL,
            method: 'POST',
        }),
        invalidatesTags: ['Product'], // it ensure that the cached data remains up-to-date and reflects the latest changes made to the product information.
     }),
     updateProduct:builder.mutation({
        query: (data) => ({
            url: `${PRODUCTS_URL}/${data._id}`, // api/products/:id
            method: 'PUT',
            body: data,
        }),
        invalidatesTags: ['Products'],
     }),
    }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery,
     useCreateProductMutation,
    useUpdateProductMutation,
    } = productApiSlice; // export the hook to use it in the component
