import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import productsReducer from './productsSlice';
import hitsSlice from './hitsSlice';
import categoriesSlice from './categoriesSlice';
import productCardSlice from './productCardSlice';
import cartSlice from './cartSlice';

import { sagas } from './sagas';
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    products: productsReducer,
    hits: hitsSlice,
    categories: categoriesSlice,
    productCard: productCardSlice,
    cart: cartSlice
  },
  middleware: (getDefaultMiddleware): any => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
})

sagaMiddleware.run(sagas);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch