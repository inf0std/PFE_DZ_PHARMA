import { createSlice, current } from "@reduxjs/toolkit";
const initialState = {
  user: { page: 1, limit: 10 },
  medicine: { page: 1, limit: 10 },
  pharmacy: { page: 1, limit: 10 },
};
const paginationSLice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setUserPagination: (state, { payload }) => {
      state.user = { ...state.user, ...payload };
    },
    nextUserPage: (state) => {
      const { page } = state.user;

      state.user = { ...state.user, page: page + 1 };
    },
    previousUserPage: (state) => {
      const { page: currentPage } = state.user;
      if (currentPage > 1)
        state.user = { ...state.user, page: currentPage - 1 };
    },
    setPharmacyPagination: (state, { payload }) => {
      state.pharmacy = { ...state.pharmacy, ...payload };
    },
    nextPharmacyPage: (state) => {
      const { page: currentPage } = state.pharmacy;
      state.pharmacy = { ...state.pharmacy, page: currentPage + 1 };
    },
    previousPharmacyPage: (state) => {
      const { currentPage } = state.pharmacy;
      if (currentPage > 1)
        state.pharmacy = { ...state.pharmacy, page: currentPage - 1 };
    },
    setMedicinePagination: (state, { payload }) => {
      state.medicine = { ...state.medicine, ...payload };
    },
    nextMedicinePage: (state) => {
      const { page: currentPage } = state.medicine;
      state.medicine = { ...state.medicine, page: currentPage + 1 };
    },
    previousMedicinePage: (state) => {
      const { page: currentPage } = state.medicine;
      if (currentPage > 1)
        state.medicine = { ...state.medicine, page: currentPage - 1 };
    },
  },
});

export const {
  setMedicinePagination,
  setPharmacyPagination,
  setUserPagination,
  nextMedicinePage,
  nextPharmacyPage,
  nextUserPage,
  previousMedicinePage,
  previousPharmacyPage,
  previousUserPage,
} = paginationSLice.actions;

export const { reducer } = paginationSLice.reducer;
export default paginationSLice.reducer;
