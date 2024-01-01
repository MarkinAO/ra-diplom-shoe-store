import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { productCard } from './model';

export interface ProductCardState {
  product?: productCard
  load: boolean
  error?: string
}

const initialState: ProductCardState = {
    load: false
}

export const productCardSlice = createSlice({
  name: 'productCard',
  initialState,
  reducers: {    
    getProductCard: (state, action: PayloadAction<string>) => {
        state.load = true;
    },
    setProductCard: (state, action: PayloadAction<productCard>) => {
        state.load = false;
        state.product = action.payload;
    },    
    setError: (state, action: PayloadAction<string>) => {
        state.error = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getProductCard, setProductCard, setError } = productCardSlice.actions

export default productCardSlice.reducer