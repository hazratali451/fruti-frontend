import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartSidebarOpen: false,
  cartList: [],
  cartTotalAmount: 0,
  deliveryCharge: 60,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartSidebarOpen: (state, action) => {
      state.cartSidebarOpen = action.payload;
    },
    setAddToCart: (state, action) => {
      const existingItem = state.cartList.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        state.cartList = state.cartList.map((item) =>
          item._id === action.payload._id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        state.cartList.push({ ...action.payload, qty: 1 });
      }
      state.cartTotalAmount = state.cartList.reduce(
        (acc, item) => acc + item.qty * item.sale_price,
        state?.deliveryCharge
      );
    },
    setRemoveFromCart: (state, action) => {
      state.cartList = state.cartList.filter(
        (item) => item._id !== action.payload._id
      );
      state.cartTotalAmount = state.cartList.reduce(
        (acc, item) => acc + item.qty * item.sale_price,
        state?.deliveryCharge
      );
    },
    setRemoveAllFromCart: (state, action) => {
      state.cartList = [];
      state.cartTotalAmount = 0;
    },
    setIncrementQty: (state, action) => {
      state.cartList = state.cartList.map((item) =>
        item._id === action.payload._id ? { ...item, qty: item.qty + 1 } : item
      );
      state.cartTotalAmount = state.cartList.reduce(
        (acc, item) => acc + item.qty * item.sale_price,
        state?.deliveryCharge
      );
    },
    setDecrementQty: (state, action) => {
      state.cartList = state.cartList.map((item) =>
        item._id === action.payload._id ? { ...item, qty: item.qty - 1 } : item
      );
      state.cartTotalAmount = state.cartList.reduce(
        (acc, item) => acc + item.qty * item.sale_price,
        state?.deliveryCharge
      );
    },
    setQuantity: (state, action) => {
      state.cartList = state.cartList.map((item) =>
        item._id === action.payload._id
          ? { ...item, qty: action.payload.qty }
          : item
      );
      state.cartTotalAmount = state.cartList.reduce(
        (acc, item) => acc + item.qty * item.sale_price,
        state?.deliveryCharge
      );
    },
    setDeliveryCharge: (state, action) => {
      state.deliveryCharge = action.payload;
      state.cartTotalAmount = state.cartList.reduce(
        (acc, item) => acc + item.qty * item.sale_price,
        action.payload
      );
    },
    setUpdateCartProduct: (state, action) => {
      state.cartList = state.cartList.map((item) => {
        const product = action.payload.find((p) => p._id === item._id);
        if (product) {
          return { ...item, price: product.sale_price };
        }
        return item;
      });
    },
  },
});

export const {
  setCartSidebarOpen,
  setAddToCart,
  setRemoveFromCart,
  setRemoveAllFromCart,
  setIncrementQty,
  setDecrementQty,
  setQuantity,
  setDeliveryCharge,
  setUpdateCartProduct,
} = cartSlice.actions;

export default cartSlice.reducer;
