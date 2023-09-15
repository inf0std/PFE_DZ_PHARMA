import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import authReducer from "./auth";
import pharmacieReducer from "./slices/pharmacies";
import medicamentReducer from "./slices/medicaments";
import usersReducer from "./slices/users";
import { userApi } from "./api";
import { pharmacyApi, medicineApi } from "./api";
const persistConfig = {
  key: "root",
  storage,
  whiteList: ["auth", "parmacie", "medicament", "users"],
  //blackList: [],
};

const rootReducer = combineReducers({
  auth: authReducer,
  pharmacie: pharmacieReducer,
  medicament: medicamentReducer,
  users: usersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: {
    persistedReducer,
    [pharmacyApi.reducerPath]: pharmacyApi.reducer,
    //[userApi.reducerPath]: userApi.reducer,
    [medicineApi.reducerPath]: medicineApi.reducer,
  },
  middleware: [thunk, pharmacyApi.middleware, medicineApi.middleware],
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
