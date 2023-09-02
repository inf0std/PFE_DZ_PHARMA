import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HOST } from "../../../constants";
//const host = "http://localhost:8000";
const baseUrl = "api/v1";

export const medList = createAsyncThunk("meds/list", async (thunkAPI) => {
  console.log("listing meds in slice");
  try {
    console.log("listing meds");
    const response = await fetch(`${HOST}/${baseUrl}/medicaments`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      //body: JSON.stringify({ email, password }),
    });
    console.log("response");
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
});

const initialState = {
  meds: { list: [] },
};

const medSlice = createSlice({
  name: "meds",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(medList.pending, (state) => {
        state.fetching = true;
      })
      .addCase(medList.fulfilled, (state, { payload }) => {
        console.log("slice", new Date()); //medList);
        state.meds.list = [...payload];
        state.fetching = false;
        state.error = null;
      })
      .addCase(medList.rejected, (state, { payload }) => {
        state.error = { ...payload };
        state.fetching = false;
      });
  },
});
// Export the action creators
//export const { login } = authSlice.actions;

// Export the async thunks

// Export the reducer
export default medSlice.reducer;
