import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./root-reducer";
import { UserAuthApi } from "../slices/apiSlices/AuthApiSlice";
import { OrderApi } from "../slices/apiSlices/OrderApiSlice";
import { PaymentApi } from "../slices/apiSlices/PaymentSlice";

const persistConfig = {
  key: "bogura-theke",
  storage: storage,
  whitelist: ["language", "cart"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      OrderApi.middleware,
      UserAuthApi.middleware,
      PaymentApi.middleware
    ),
});
