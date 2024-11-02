import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Products from "../types/productTypes";

interface cartItem extends Products {
  quantity: number;
}
interface CartState {
  items: cartItem[];
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
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else state.items.push({ ...action.payload, quantity: 1 });
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (state.items[index].quantity > 1) {
        state.items[index].quantity -= 1;
      } else {
        state.items.splice(index, 1);
      }
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

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
