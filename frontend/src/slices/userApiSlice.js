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
     logout: builder.mutation({
        query: () => ({
            url : `${USERS_URL}/logout`, 
            method:'POST', // the method to send the data
        }),
     }),
     
    }),
});

export const { useLoginMutation, useLogoutMutation } = usersApiSlice; // export the hook to use it in the component
