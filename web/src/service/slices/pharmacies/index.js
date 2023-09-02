import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  per_page: 10,
};

export const pharmacieSlice = createSlice({
  name: "pharmacies",
  initialState,
  reducers: {
    changePagination: (state, { payload }) => {
      state.page = payload.page ?? state.page;
      state.per_page = payload.per_page ?? state.per_page;
    },
  },
});

export const { changePagination } = pharmacieSlice.actions;
export const { reducer } = pharmacieSlice;
export default pharmacieSlice.reducer;
