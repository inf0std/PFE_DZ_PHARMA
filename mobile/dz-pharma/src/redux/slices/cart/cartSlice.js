import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { HOST } from "../../../constants";

const findPrescription = createAsyncThunk(
  "cart/find",
  async (body, thunkAPI) => {
    //console.log("data", data);
    try {
      const response = await axios
        .post(`${HOST}/api/v1/search`, {
          ...body,
        })
        .then();
      console.log(response.data);

      return response.data;
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
  results: null,
  error: false,
  fetching: false,
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
    reset: (state, { payload }) => {
      state.results = null;
      state.error = null;
      state.displayedResult = null;
      state.meds = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(findPrescription.pending, (state) => {
        state.fetching = true;
        state.results = null;
        state.error = false;
        state.displayedResult = null;
      })
      .addCase(findPrescription.fulfilled, (state, { payload }) => {
        console.log("search success");
        console.log("payload", payload);
        state.results = payload.results;
        state.error = false;
      })
      .addCase(findPrescription.rejected, (state, { payload }) => {
        state.error = true;
        state.fetching = false;
      });
  },
});
// Export the action creators
export const {
  addMed,
  removeMed,
  incMedCount,
  decMedCount,
  setDisplayedResult,
  reset,
} = cartSlice.actions;

// Export the async thunks
export { findPrescription };

// Export the reducer
export default cartSlice.reducer;
