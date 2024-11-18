import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import languageReducer from "../slices/languageSlice";
import userReducer from "../slices/userSlice";
import loadingReducer from "../slices/loadingSlice";
import { UserAuthApi } from "../slices/apiSlices/AuthApiSlice";
import { OrderApi } from "../slices/apiSlices/OrderApiSlice";
import { PaymentApi } from "../slices/apiSlices/PaymentSlice";

//register all reducers here
export const rootReducer = combineReducers({
  user: userReducer,
  language: languageReducer,
  cart: cartReducer,
  loading: loadingReducer,
  [UserAuthApi.reducerPath]: UserAuthApi.reducer,
  [OrderApi.reducerPath]: OrderApi.reducer,
  [PaymentApi.reducerPath]: PaymentApi.reducer,
});
