import { Route, Routes } from 'react-router-dom';
import Home from "../../pages/Home";
import About from "../../pages/About";
import Cart from "../../pages/Cart";
import Catalog from "../../pages/Catalog";
import Contacts from "../../pages/Contacts";
import NotFound from "../../pages/404";
import ProductCard from '../../pages/ProductCard';
import PageWrap from './PageWrap';
import { Provider } from 'react-redux';
import { store } from '../../shared/model/store';

export default function Pages() {
    return(
        <Provider store={store}>
            <Routes>
                <Route path='/' element={<PageWrap />} >
                    <Route path='/' element={<Home />} />
                    <Route path='/About' element={<About />} />
                    <Route path='/Cart' element={<Cart />} />
                    <Route path='/Catalog' element={<Catalog />} />
                    <Route path='/Catalog/:id' element={<ProductCard />} />
                    <Route path='/Contacts' element={<Contacts />} />
                    <Route path='*' element={<NotFound />} />
                </Route>                
            </Routes>
        </Provider>        
    )
}