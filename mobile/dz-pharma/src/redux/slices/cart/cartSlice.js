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
        body: JSON.stringify(data),
      });
      //console.log("search response", response);
      const data = await response.json();
      //console.log("search result", data);
      if (!response.ok) {
        //console.log("error searching", response);
        return thunkAPI.rejectWithValue({
          error: "echec de connection",
          data,
        });
      }
      return data;
    } catch (e) {
      //console.log("error searcing ________________________", e);
      return thunkAPI.rejectWithValue({
        error: "echec de connection",
        data,
      });
    }
  }
);

const initialState = {
  meds: [],
  results: [
    {
      score: 10,
      distence: 1.5,
      remboursement: 3000,
      pharmacies: [
        {
          nom: "chirifi",
          longitude: 2.99353495582114,
          latitude: 36.712691747354654,
        },
      ],
    },
  ],
  displayedResult: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addMed: (state, { payload }) => {
      state.meds = [...state.meds, { med: payload, count: 1 }];
    },
    removeMed: (state, { payload }) => {
      state.meds = state.meds.filter((_, index) => index != payload);
    },
    incMedCount: (state, { payload }) => {
      state.meds[payload].count++;
    },
    decMedCount: (state, { payload }) => {
      state.meds[payload].count--;
    },
    setDisplayedResult: (state, { payload }) => {
      state.displayedResult = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(findPrescription.pending, (state) => {})
      .addCase(findPrescription.fulfilled, (state, { payload }) => {
        console.log("search success");
        console.log("payload", payload);
        state.results = JSON.parse(payload);
      })
      .addCase(findPrescription.rejected, (state, { payload }) => {});
  },
});
// Export the action creators
export const {
  addMed,
  removeMed,
  incMedCount,
  decMedCount,
  setDisplayedResult,
} = cartSlice.actions;

// Export the async thunks
export { findPrescription };

// Export the reducer
export default cartSlice.reducer;
