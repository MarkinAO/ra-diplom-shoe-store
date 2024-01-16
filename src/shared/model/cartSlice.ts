import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { itemOfCart, order } from './model';

export interface CartState {
  products: itemOfCart[]
  count: number
  load: boolean
  error: string
  orderComplete: boolean
}

const initialState: CartState = {
    products: [],
    count: 0,
    load: false,
    error: '',
    orderComplete: false
}

export const CartSlice = createSlice({
  name: 'cart',
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
        state.count = newArr.length;
    },
    setCartData: (state, action: PayloadAction<itemOfCart[]>) => {        
        state.count = action.payload.length;
        state.products = [...action.payload];
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
        const deleteCount = state.products.filter(prod => prod.product.id === action.payload)[0].count;
        state.count = state.count - deleteCount;
        state.products = state.products.filter(prod => prod.product.id !== action.payload);
    },
    sendOrder: (state, action: PayloadAction<order>) => {
        state.load = true
        state.error = ''
    },
    orderComplete: (state) => {
        state.load = false
        state.orderComplete = true
    },
    setError: (state, action: PayloadAction<string>) => {
        state.load = false
        state.error = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { addProduct, deleteProduct, setCartData, sendOrder, orderComplete, setError } = CartSlice.actions

export default CartSlice.reducer