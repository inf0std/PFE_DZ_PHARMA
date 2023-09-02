import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  per_page: 10,
};

export const medicamentSlice = createSlice({
  name: "medicaments",
  initialState,
  reducers: {
    changePagination: (state, { payload }) => {
      state.page = payload.page ?? state.page;
      state.per_page = payload.per_page ?? state.per_page;
    },
  },
});

export const { changePagination } = medicamentSlice.actions;
export const { reducer } = medicamentSlice;
export default medicamentSlice.reducer;
