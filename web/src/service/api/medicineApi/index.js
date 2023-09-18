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

    getStock: builder.query({
      query: ({ id }) => ({ url: `/getStockList?pharmacie_id=${id}` }),
    }),

    createMedicine: builder.mutation({
      query: (body) => ({
        url: `/`,
        method: "Post",
        body: body,
      }),
    }),

    addStock: builder.mutation({
      query: (body) => ({
        url: `/addStock?pharmacie_id=${body.id}`,
        method: "POST",
        body: body,
      }),
    }),

    addSale: builder.mutation({
      query: (body) => ({
        url: `/sale?pharmacie_id=${body.id}`,
        method: "POST",
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
  useGetStockQuery,
  useCreateMedicineMutation,
  useDeleteMedicineMutation,
  useAddStockMutation,
  useAddSaleMutation,
} = medicineApi;
