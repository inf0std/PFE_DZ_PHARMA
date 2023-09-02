import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HOST } from "../../../constants";

const findPrescription = createAsyncThunk(
  "cart/find",
  async (data, thunkAPI) => {
    try {
      const response = await fetch(`${HOST}/api/v1/search`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok) {
        return thunkAPI.rejectWithValue({
          error: "echeck de connection",
          data,
        });
      }
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        error: "echeck de connection",
        data,
      });
    }
  }
);

const initialState = {
  meds: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addMed: (state, { payload }) => {
      if (state.meds.some((med) => med.ID == payload.ID)) {
        state.meds = [
          ...state.meds.map((med) =>
            med.id != payload.id ? med : { ID: med.ID, num: num + payload.num }
          ),
        ];
      }
      state.meds = [...state.meds, payload];
    },
    removeMed: (state, { payload }) => {
      state.meds = [...state.meds.filter((med) => med.ID != payload.ID)];
    },
  },
  extraReducers: (builder) => {
    /*  builder.addCase(signin.pending, (state) => {
      state.singingIn = true;
    }); */
  },
});
// Export the action creators
export const { addMed, removeMed } = cartSlice.actions;

// Export the async thunks
export { findPrescription };

// Export the reducer
export default cartSlice.reducer;
