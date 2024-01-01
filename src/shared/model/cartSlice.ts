import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { itemOfCart } from './model';

export interface CartState {
  products: itemOfCart[]
  count: number
}

const initialState: CartState = {
    products: [],
    count: 0,
}

export const CartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {    
    addProduct: (state, action: PayloadAction<itemOfCart>) => {
        let newArr;
        if(state.products.findIndex(prod => prod.product.id === action.payload.product.id && prod.size === action.payload.size) !== -1) {
            newArr = state.products.map(prod => {
                if(prod.product.id === action.payload.product.id && prod.size === action.payload.size) {
                    const updateProd = {...prod, count: prod.count + action.payload.count}
                    return updateProd;
                } else {
                    return prod;
                }
            }) 
        } else {
            newArr = [...state.products, action.payload];
        }
        
        state.products = newArr;
        state.count = state.count + action.payload.count;
    },    
    deleteProduct: (state, action: PayloadAction<number>) => {
        const deleteCount = state.products.filter(prod => prod.product.id === action.payload)[0].count;
        state.count = state.count - deleteCount;
        state.products = state.products.filter(prod => prod.product.id !== action.payload);
    }
  },
})

// Action creators are generated for each case reducer function
export const { addProduct, deleteProduct } = CartSlice.actions

export default CartSlice.reducer