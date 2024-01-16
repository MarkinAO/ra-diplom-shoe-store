import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { product } from './model';

export interface ProductsState {
  products: product[]
  load: boolean
  moreLoad: boolean
  isMoreProducts: boolean
  searchQuery: string
  error?: string
  errorMore?: string
}

const initialState: ProductsState = {
    products: [],
    load: false,
    moreLoad: false,
    isMoreProducts: true,
    searchQuery: ''
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {    
    getProducts: (state) => {
        state.load = true;
        state.error = ''
    },
    setProducts: (state, action: PayloadAction<product[]>) => {
        state.load = false;
        state.products = action.payload;
        state.isMoreProducts = action.payload.length < 6 ? false : true;
    },
    getMoreProducts: (state) => {
        state.moreLoad = true;
        state.errorMore = ''
    },
    setMoreProducts: (state, action: PayloadAction<product[]>) => {
        state.moreLoad = false;
        state.errorMore = '';
        state.products = [...state.products, ...action.payload];
        state.isMoreProducts = action.payload.length === 6 ? true : false;
    },
    setError: (state, action: PayloadAction<string>) => {
        state.error = action.payload
        state.load = false
    },
    setMoreError: (state, action: PayloadAction<string>) => {
      state.errorMore = action.payload;
      state.moreLoad = false;
  },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    getSearch: (state, action: PayloadAction<string>) => {
      state.load = true;
      state.error = ''
    },
    setLoad: (state) => {
      state.load = true;
      state.error = ''
    },
    disableLoad: (state) => {
      state.load = false;
    }
  },
})

// Action creators are generated for each case reducer function
export const { getProducts, setProducts, setMoreProducts, getMoreProducts, setError, setSearchQuery, getSearch, setLoad, disableLoad, setMoreError } = productsSlice.actions

export default productsSlice.reducer