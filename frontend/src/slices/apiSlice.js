import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL} from '../constants';

const baseQuery = fetchBaseQuery({baseUrl: BASE_URL}); // fetchBaseQuery is a function that takes an object with a baseUrl property and returns a function that takes a string and returns a promise.
export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['product', 'Order', 'User'],
    endpoints: (builder) =>({}),
});