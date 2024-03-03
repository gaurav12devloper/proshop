import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({ //it will enject endpoint into the apiSlice
    endpoints:(builder) => ({ 
        login: builder.mutation({ // mutation is used to send data to the server
            query: (data) => ({
            url : `${USERS_URL}/auth`, 
            method:'POST', // the method to send the data
            body:data // the data to send to the server
        }),

     }),
     register: builder.mutation({
        query: (data) => ({
            url : `${USERS_URL}`, // send request for register
            method:'POST', // the method to send the data
            body:data      // set the data to body so that out request url api/users will get the data and stored in database
        }),
     }),
     logout: builder.mutation({
        query: () => ({
            url : `${USERS_URL}/logout`, 
            method:'POST', // the method to send the data
        }),
     }),
     
    }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = usersApiSlice; // export the hook to use it in the component
