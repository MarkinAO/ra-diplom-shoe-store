import axios from "axios";
import { put, retry, select, spawn, takeLatest } from "redux-saga/effects";
import { PayloadAction } from '@reduxjs/toolkit';
import { setHits, setError as setHitsError } from "./hitsSlice";
import { setProducts, setMoreProducts, setError as setProductError } from "./productsSlice";
import { setCategories, setError as setCategoriesError } from "./categoriesSlice";
import { setProductCard, setError as setProductCardError } from "./productCardSlice";
import { setProduct } from "./cartSlice";
import type { itemOfCart } from "./model";
const URL = import.meta.env.VITE_URL_API;

const count = Infinity;
const delay = 1000;

function* handleGetProductsSaga(setData: Function, setError: Function, url: string): Generator {    
    try {
        const data = yield retry(count, delay, getData, url);
        yield put(setData(data));
    } catch (error: any) {
        yield put(setError(error?.message));
    }
}

function* handleGetCategoriesSaga(): Generator {    
    try {             
        const data = yield retry(count, delay, getData, 'categories');
        yield put(setCategories(data));
    } catch (error: any) {
        yield put(setCategoriesError(error?.message));
    }
}

function* handleSetActiveCategorySaga(): Generator {    
    try {        
        const activeCategory = yield select((state) => state.categories.activeCategory);
        const searchQuery = yield select((state) => state.products.searchQuery);
        let query = `items?categoryId=${activeCategory}`;
        if(searchQuery) query += `&q=${searchQuery}`;        
        const data = yield retry(count, delay, getData, query);
        yield put(setProducts(data));
    } catch (error: any) {
        yield put(setCategoriesError(error?.message));
    }
}

function* handleGetMoreProductsSaga(): Generator {    
    try {        
        const products = yield select((state) => state.products.products.length);
        const activeCategory = yield select((state) => state.categories.activeCategory);
        const searchQuery = yield select((state) => state.products.searchQuery);
        let query = 'items?offset=' + products;        
        if(activeCategory !== 0) query += `&categoryId=${activeCategory}`;
        if(searchQuery) query += `&q=${searchQuery}`;
        const data = yield retry(count, delay, getData, query);
        yield put(setMoreProducts(data));
    } catch (error: any) {
        yield put(setProductError(error?.message));
    }
}

function* handleGetProductCardSaga(action: PayloadAction<string>): Generator {    
    try {        
        const data = yield retry(count, delay, getData, `items/${action.payload}`);
        yield put(setProductCard(data));
    } catch (error: any) {
        yield put(setProductCardError(error?.message));
    }
}

function* handleGetSearchSaga(action: PayloadAction<string>): Generator {    
    try {        
        const activeCategory = yield select((state) => state.categories.activeCategory);
        let query = 'items?q=' + action.payload;
        if(activeCategory !== 0) query += `&categoryId=${activeCategory}`;
        const data = yield retry(count, delay, getData, query);
        yield put(setProducts(data));
    } catch (error: any) {
        yield put(setProductError(error?.message));
    }
}

function* watchGetHitsSaga() {
    yield takeLatest("hits/getHits", () => handleGetProductsSaga(setHits, setHitsError, 'top-sales'))
}

function* watchGetProductsSaga() {
    yield takeLatest("products/getProducts", () => handleGetProductsSaga(setProducts, setProductError, 'items'))
}

function* watchGetCategoriesSaga() {    
    yield takeLatest("categories/getCategories", handleGetCategoriesSaga)
}

function* watchSetActiveCategorySaga() {    
    yield takeLatest("categories/setActiveCategory", handleSetActiveCategorySaga)
}

function* watchAddProductsSaga() {    
    yield takeLatest("products/getMoreProducts", handleGetMoreProductsSaga)
}

function* watchGetProductCardSaga() {    
    yield takeLatest("productCard/getProductCard", handleGetProductCardSaga)
}

function* watchGetSearchSaga() {    
    yield takeLatest("products/getSearch", handleGetSearchSaga)
}

export async function getData(queryString?: string) {    
    const url = URL + queryString;
    return await axios.get(url).then(res => {                
                        if(res.status === 200) {
                            return res.data
                        }
                    })    
}

export function* sagas() {
    yield spawn(watchGetHitsSaga);
    yield spawn(watchGetProductsSaga);
    yield spawn(watchAddProductsSaga);
    yield spawn(watchGetCategoriesSaga);
    yield spawn(watchSetActiveCategorySaga);
    yield spawn(watchGetProductCardSaga);
    yield spawn(watchGetSearchSaga);    
}