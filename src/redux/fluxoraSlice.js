// src/redux/orebiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const orebiSlice = createSlice({
  name: 'FLUXORA',
  initialState: {
    products: [], // Array of cart items
  },
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, quantity } = action.payload;
      const existingItem = state.products.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.products.push({ id, name, price, quantity });
      }
    },
    resetCart: (state) => {
      state.products = [];
    },
    deleteItem: (state, action) => {
      const { id } = action.payload;
      state.products = state.products.filter(item => item.id !== id);
    },
    decreaseQuantity: (state, action) => {
      const { id } = action.payload;
      const item = state.products.find(item => item.id === id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item) {
        state.products = state.products.filter(item => item.id !== id);
      }
    },
    increaseQuantity: (state, action) => {
      const { id } = action.payload;
      const item = state.products.find(item => item.id === id);
      if (item) {
        item.quantity += 1;
      }
    },
  },
});

export const { addToCart, resetCart, deleteItem, decreaseQuantity, increaseQuantity } = orebiSlice.actions;

export default orebiSlice.reducer;
