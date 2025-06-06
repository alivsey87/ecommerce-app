import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/types";

interface CartState {
  items: Product[];
}

const initialState: CartState = {
  items: JSON.parse(sessionStorage.getItem("cart") || "[]"),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      state.items.push(action.payload);
      sessionStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart(state) {
      state.items = [];
      sessionStorage.setItem("cart", JSON.stringify(state.items));
    }
  },
});

export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;