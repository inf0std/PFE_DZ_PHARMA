import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//import axiosBaseQuery from "../baseQuery";
import { API_URL } from "../../../constants";
export const medicineApi = createApi({
  reducerPath: "MedicineApi",

  baseQuery: fetchBaseQuery({ baseUrl: API_URL + "/medicines" }),
  entityTypes: ["Medicines"],
  endpoints: (builder) => ({
    fetchMedicines: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
        params: {},
      }),
    }),
    fetchMedicine: builder.query({
      query: ({ id }) => ({ url: `/${id}`, method: "GET" }),
    }),
    createMedicine: builder.mutation({
      query: (body) => ({
        url: `/`,
        method: "Post",
        body: body,
      }),
    }),

    deleteMedicine: builder.mutation({
      query: ({ id }) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchMedicineQuery,
  useFetchMedicinesQuery,
  useCreateMedicineMutation,
  useDeleteMedicineMutation,
} = medicineApi;
