import { PRODUCTS_URL, USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({ //it will enject endpoint into the apiSlice
    endpoints:(builder) => ({ 
        login: builder.mutation({ // mutation is used to send data to the server
            query: (data) => ({
            url : USERS_URL / auth, // the url to fetch the data from
            method:'POST', // the method to send the data
            body:data // the data to send to the server
        }),
        keepUnusedDataFor:5 // keep the data for 5 minutes even if it is not being used(stored data in catche for 5 minutes)
     }),
     

    }),
});

export const { useLoginMutation } = usersApiSlice; // export the hook to use it in the component
