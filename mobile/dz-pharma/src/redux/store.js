// store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/dist/query";
import authReducer from "./slices/auth/authSlice";
import medsReducer from "./slices/meds/medsSlice";
import cartReducer from "./slices/cart/cartSlice";

import storage from "redux-persist/lib/storage";

import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["auth", "meds"],
};

//const rootReducer = combineReducers({ auth: authReducer, medsReducer });
const persisted = persistReducer(
  persistConfig,
  combineReducers({ auth: authReducer })
);
export const store = configureStore({
  reducer: {
    persisted,
    meds: medsReducer,
    cart: cartReducer,
  },
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
