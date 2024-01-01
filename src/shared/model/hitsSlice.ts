import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { product } from './model';

export interface HitsState {
  hits: product[]
  load: boolean
  error?: string | undefined
}

const initialState: HitsState = {
    hits: [],
    load: false    
}

export const hitsSlice = createSlice({
  name: 'hits',
  initialState,
  reducers: {    
    getHits: (state) => {
        state.load = true
    },
    setHits: (state, action: PayloadAction<product[]>) => {
        state.load = false
        state.hits = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
        state.error = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getHits, setHits, setError } = hitsSlice.actions

export default hitsSlice.reducer