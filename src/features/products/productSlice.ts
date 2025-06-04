import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/types";

interface ProductState {
  products: Product[];
  selectedCategory: string;
}

const initialState: ProductState = {
  products: [],
  selectedCategory: "",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    setSelectedCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setProducts, setSelectedCategory } = productSlice.actions;
export default productSlice.reducer;