import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "UsersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "localhost:8080/api/v1/",
  }),
  endpoints: (builder) => ({
    fetchUsers: builder.query({
      query: ({ limit, startingIndex }) =>
        `users?limit=${limit ? limit : "*"}&startingIndex=${
          startingIndex ? startingIndex : 0
        }`,
    }),
    fetchUser: builder.query({
      query: ({ id }) => `users/${id}`,
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: `users/`,
        method: "Post",
        body: body,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const { useFetchUserQuery, useFetchUsersQuery, useCreateUserMutation } =
  userApi;
