import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({ //it will enject endpoint into the apiSlice
    endpoints:(builder) => ({ 
        login: builder.mutation({ // mutation is used to send data to the server
            query: (data) => ({
            url : `${USERS_URL}/auth`,   //api/users/auth
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
     profile: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/profile`, // send request for profile update api/users/profile
          method: 'PUT',
          body: data,
        }),
      }),
      getUsers: builder.query({
        query: () => ({
          url: `${USERS_URL}`, // send request for all users /api/users
        }),
        providesTags: ['User'],
        keepUnusedDataFor: 5,
      }),
      deleteUser: builder.mutation({
        query: (userId) => ({
          url: `${USERS_URL}/${userId}`, // send request for delete user /api/users/:id
          method: 'DELETE',
        }),
        invalidatesTags: ['User'],
      }),
      getUserDetails: builder.query({
        query: (userId) => ({
          url: `${USERS_URL}/${userId}`, // send request for user details /api/users/:id
        }),
        keepUnusedDataFor: 5,
      }),
      updateUser: builder.mutation({
        query: (data) => ({
          url: `/${USERS_URL}/${data.userId}`, // send request for update user /api/users/:id
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: ['User'],
      }),
     
    }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation,
     useProfileMutation,
    useGetUsersQuery,
    useDeleteUserMutation,
    useGetUserDetailsQuery,
    useUpdateUserMutation,
    } = usersApiSlice; // export the hook to use it in the component
