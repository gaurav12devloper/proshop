import { PRODUCTS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({ //it will enject endpoint into the apiSlice
    endpoints:(builder) => ({ 
        getProducts: builder.query({ // query is used to fetch data from the server
            query: ({pageNumber}) => ({
            url : PRODUCTS_URL, // the url to fetch the data from
            params: {pageNumber}, // the page number to fetch the data from
        }),
        keepUnusedDataFor:5, // keep the data for 5 minutes even if it is not being used(stored data in catche for 5 minutes)
        providesTags: ['products'], // it provides the tag to the data so that we can invalidate the data when we update the data
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
     uploadProductImage: builder.mutation({
        query: (data) => ({
            url: `${UPLOAD_URL}`,  // api/upload
            method: 'POST',
            body: data,
        }),
     }), 
     deleteProduct:builder.mutation({
        query: (productId) => ({
            url: `${PRODUCTS_URL}/${productId}`, // api/products/:id
            method: 'DELETE',
        }),
        invalidatesTags: ['Products'],
     }), 
     createReview: builder.mutation({
        query: (data) => ({
          url: `${PRODUCTS_URL}/${data.productId}/reviews`, // api/products/:id/reviews
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['Product'],
      }),  
    }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery,
     useCreateProductMutation,
    useUpdateProductMutation,
    useUploadProductImageMutation,
    useDeleteProductMutation,
    useCreateReviewMutation,
    } = productApiSlice; // export the hook to use it in the component
