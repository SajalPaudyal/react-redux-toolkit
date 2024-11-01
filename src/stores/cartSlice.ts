import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Products from "../types/productTypes";

interface CartState {
  items: Products[];
  products: Products[];
  status: "idle" | "loading" | "loaded" | "failed";
}

const initialState: CartState = {
  items: [],
  products: [],
  status: "loading",
};

export const fetchProducts = createAsyncThunk(
  "cart/fetchProducts",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data: Products[] = await response.json();
    return data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Products>) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<Products>) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<Products[]>) => {
        state.status = "loaded";
        state.products = action.payload;
      }
    );
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
