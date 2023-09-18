import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//import axiosBaseQuery from "../baseQuery";
import { API_URL } from "../../../constants";
export const pharmacyApi = createApi({
  reducerPath: "PharmacyApi",

  baseQuery: fetchBaseQuery({ baseUrl: API_URL + "/pharmacies" }),
  entityTypes: ["Pharmacies"],
  endpoints: (builder) => ({
    fetchPharmacies: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
        params: {},
      }),
    }),
    fetchPharmacy: builder.query({
      query: ({ id }) => ({ url: `/${id}`, method: "GET" }),
    }),
    createPharmacy: builder.mutation({
      query: (body) => ({
        url: `/`,
        method: "Post",
        body: body,
      }),
    }),
    addSale: builder.mutation({
      query: (body) => ({
        url: `/${body.id}/sale`,
        method: "post",
        body: body,
      }),
    }),
    deletePharmacy: builder.mutation({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchPharmacyQuery,
  useFetchPharmaciesQuery,
  useCreatePharmacyMutation,
  useDeletePharmacyMutation,
} = pharmacyApi;
