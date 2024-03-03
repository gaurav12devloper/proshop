import { apiSlice } from './apiSlice';
import { ORDERS_URL, PAYPAL_URL} from '../constants';
export const ordersApiSlice = apiSlice.injectEndpoints({   
    endpoints: (builder)=>({ // builder is an object that contains methods for creating endpoints
        createOrder: builder.mutation({ 
            query: (order)=>({
                url: ORDERS_URL, // url for the request /api/orders
                method: 'POST',
                body: {...order},
            }),
        }),
        getOrderDetails: builder.query({
            query: (id)=>({
                url: `${ORDERS_URL}/${id}`, // url for the request /api/orders/:id
            }),
            keepUnuseDataFor: 5,
        }),
        payOrder: builder.mutation({
            query: ({orderId, details})=>({
                url: `${ORDERS_URL}/${orderId}/pay`, // url for the request /api/orders/:id/pay
                method: 'PUT',
                body: {...details},
            }),
        }),
        getPaypalClientId: builder.query({
            query: ()=>({
                url: PAYPAL_URL, // url for the request /api/config/paypal
            }),
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery, usePayOrderMutation, useGetPaypalClientIdQuery } = ordersApiSlice;