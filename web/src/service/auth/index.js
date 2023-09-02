import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_AUTH_URL } from "../../constants";
import axios from "axios"; // Import axios

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      console.log(thunkAPI);
      // Use axios instead of fetch
      let response = await axios.post(`${API_AUTH_URL}/SignIn`, {
        email,
        password,
      });
      console.log(response.data);

      // axios automatically parses the response data, so you don't need response.json()
      let data = response.data;

      return response.status === 200 ? data : thunkAPI.rejectWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async ({}, thunkAPI) => {
  try {
    let response = await fetch(API_AUTH_URL + "/logout", {
      method: "POST",
      body: "",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    console.log(thunkAPI);

    let data = await response.json();
    return response.status == 200 ? data : thunkAPI.rejectWithValue(data);
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const signup = createAsyncThunk(
  "auth/signup",
  async (
    { firstname, lastname, birth_date, email, password, password2 },
    thunkAPI
  ) => {
    console.log(thunkAPI);

    console.log(firstname, lastname, email, password, password2, birth_date);
    try {
      let response = await fetch(API_AUTH_URL + "/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          birth_date,
          email,
          password,
          password2,
        }),
      });
      let data = await response.json();
      return response.status == 200 ? data : thunkAPI.rejectWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
const initialState = {
  value: {},
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, { payload }) => {
      state.value = { ...payload };
    },
    loggedOut: (state) => {
      state.value = { ...initialState.value };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.value.loginPending = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.value = { ...payload };
      })
      .addCase(login.rejected, (state) => {
        state.value = { ...initialState.value };
      })
      /* .addCase(login.rejectWithValue, (state, { payload }) => {
        state.value = { ...payload };
      }) */
      .addCase(logout.pending, (state) => {
        state.value.logoutPending = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.value = { ...initialState.value };
      })
      .addCase(logout.rejected, (state) => {
        state.value.logoutFailed = true;
      })
      /* .addCase(logout.rejectWithValue, (state, { payload }) => {
        state.value = { ...payload };
      }) */
      .addCase(signup.pending, (state) => {
        state.value.signupPending = true;
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.value = { ...payload };
      })
      .addCase(signup.rejected, (state, { payload }) => {
        state.value = { ...payload };
      });
    /* .addCase(signup.rejectWithValue, (state, { payload }) => {
        state.value = { ...payload };
      }); */
  },
});

export const { setAuth, loggedOut } = authSlice.actions;
export const { reducer } = authSlice;
export default authSlice.reducer;
