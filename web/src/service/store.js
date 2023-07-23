import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import authReducer from "./auth";
import paginationReducer from "./slices/pagination";

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["auth", "pagination"],
  blackList: [],
};

const rootReducer = combineReducers({
  auth: authReducer,
  pagination: paginationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: {
    persistedReducer,
    //[userApi.reducerPath]: userApi.reducer,
  },
  middleware: [thunk],
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
