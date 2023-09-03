import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../baseQuery";

export const pharmacyApi = createApi({
  reducerPath: "UsersApi",

  baseQuery: axiosBaseQuery,
  entityTypes: ["Agencies"],
  endpoints: (builder) => ({
    fetchPharmacies: builder.query({
      query: () => ({
        url: "pharmacy/list",
        method: "GET",
        params: {},
      }),
    }),
    fetchPharmacy: builder.query({
      query: ({ id }) => ({ url: `pharmacies/${id}`, method: "GET" }),
    }),
    createPharmacy: builder.mutation({
      query: (body) => ({
        url: `pharmacies/`,
        method: "Post",
        body: body,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    addStockMutation: builder.mutation({
      query: (body) => ({
        url: `pharmacies/${body.id}/addStock`,
        method: "POST",
        body: body,
      }),
    }),
    deletePharmacy: builder.mutation({
      query: ({ id }) => ({
        url: `pharmacies/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchPharmacyQuery,
  useFetchPharmaciesQuery,
  useCreatepharmacyMutation,
  useDeletePharmacyMutation,
} = pharmacyApi;
