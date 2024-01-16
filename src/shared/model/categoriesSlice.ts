import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { category } from './model';

export interface CategoriesState {
  categories: category[]
  activeCategory: number
  load: boolean
  error?: string | undefined
}

const initialState: CategoriesState = {
    categories: [],
    activeCategory: 0,
    load: false    
}

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {    
    getCategories: (state) => {
        state.load = true
        state.error = ''
    },
    setCategories: (state, action: PayloadAction<category[]>) => {
        state.load = false
        state.categories = [{id: 0, title: 'Все'} ,...action.payload]
    },
    setActiveCategory: (state, action: PayloadAction<number>) => {
        state.activeCategory = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
        state.error = action.payload
        state.load = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { getCategories, setCategories, setError, setActiveCategory } = categoriesSlice.actions

export default categoriesSlice.reducer