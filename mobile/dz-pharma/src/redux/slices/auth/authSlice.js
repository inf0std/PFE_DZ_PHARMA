import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const host = "http://localhost:8000";
const baseUrl = "api/v1";
const signin = createAsyncThunk(
  "auth/singin",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await fetch(`${host}/${baseUrl}/auth/signin`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
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

const signout = createAsyncThunk("auth/signout", async ({}, thunkAPi) => {
  try {
    const response = await fetch(`${host}/${baseUrl}/auth/logout`);
    const data = await response.json();
    if (!response.ok) {
      return thunkAPi.rejectWithValue({ error: "echec de deconnexion", data });
    }
    return data;
  } catch (e) {
    return thunkAPi.rejectWithValue({ error: "echec de deconnexion", data });
  }
});

const signup = createAsyncThunk(
  "auth/signup",
  async ({ email, password, firstname, lastname, birthdate }, thunkAPI) => {
    try {
      const response = await fetch(`${host}/${baseUrl}/auth/signup`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          firstname,
          lastname,
          birthdate,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        return thunkAPI.rejectWithValue({
          error: "echec d'inscritpion'",
          data,
        });
      }
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        error: "echeck d'inscription'",
        data,
      });
    }
  }
);

const initialState = {
  data: null,
  singingIn: false,
  signingOut: false,
  signingUp: false,
  errorSingingIn: null,
  errorSingingOut: null,
  errorSingingUp: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.singingIn = true;
      })
      .addCase(signin.fulfilled, (state, { payload }) => {
        state.data = { ...payload };
        state.singingIn = false;
      })
      .addCase(signin.rejected, (state, { payload }) => {
        state.errorSingingIn = { ...payload };
        state.singingIn = false;
      })
      .addCase(signout.pending, (state) => {
        state.signingOut = true;
      })
      .addCase(signout.fulfilled, (state) => {
        state = { ...initialState };
      })
      .addCase(signout.rejected, (state, { payload }) => {
        state = { ...state, errorSingingOut: { ...payload } };
      })
      .addCase(signup.pending, (state) => {
        state.signingUp = true;
      })
      .addCase(signup.fulfilled, (state) => {
        state = { ...initialState };
      })
      .addCase(signup.rejected, (state, { payload }) => {
        state = { ...initialState, errorSingingUp: { ...payload } };
      });
  },
});
