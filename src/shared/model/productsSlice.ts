import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { product } from './model';

export interface ProductsState {
  products: product[]
  load: boolean
  isMoreProducts: boolean
  searchQuery: string
  error?: string
}

const initialState: ProductsState = {
    products: [],
    load: false,
    isMoreProducts: true,
    searchQuery: ''
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {    
    getProducts: (state) => {
        state.load = true;
    },
    setProducts: (state, action: PayloadAction<product[]>) => {
        state.load = false;
        state.products = action.payload;
        state.isMoreProducts = action.payload.length < 6 ? false : true;
    },
    getMoreProducts: (state) => {
        state.load = true;
    },
    setMoreProducts: (state, action: PayloadAction<product[]>) => {
        state.load = false;
        state.products = [...state.products, ...action.payload];
        state.isMoreProducts = action.payload.length === 6 ? true : false;
    },
    setError: (state, action: PayloadAction<string>) => {
        state.error = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    getSearch: (state, action: PayloadAction<string>) => {
      state.load = true;
    }
  },
})

// Action creators are generated for each case reducer function
export const { getProducts, setProducts, setMoreProducts, getMoreProducts, setError, setSearchQuery, getSearch } = productsSlice.actions

export default productsSlice.reducer