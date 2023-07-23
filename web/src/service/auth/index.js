import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};
export const auth = createSlice({ name: "auth", initialState, reducers: {} });
