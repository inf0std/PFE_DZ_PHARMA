import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  per_page: 10,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    changePagination: (state, { payload }) => {
      state.page = payload.page ?? state.page;
      state.per_page = payload.per_page ?? state.per_page;
    },
  },
});

export const { changePagination } = usersSlice.actions;
export const { reducer } = usersSlice;
export default usersSlice.reducer;
