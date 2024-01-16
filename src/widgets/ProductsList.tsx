import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../shared/model/store";
import Loader from "../shared/ui/Loader";
import ProductPrevueCard from "../entities/ProductPrevueCard";
import { useEffect } from "react";
import { getProducts, getMoreProducts, getSearch } from "../shared/model/productsSlice";
import MoreProducts from "../shared/ui/MoreProducts";
import ErrorButton from "../shared/ui/ErrorButton";

export default function ProductsList() {
    const { products, load, moreLoad, error, errorMore } = useSelector((state: RootState) => state.products);
    const { searchQuery } = useSelector((state: RootState) => state.products);
    const dispatch = useDispatch();
    const getData = () => {
        if(searchQuery) {
            dispatch(getSearch(searchQuery))
        } else {
            dispatch(getProducts())
        }        
    }
    const getMoreData = () => {
        dispatch(getMoreProducts())
    }
    
    useEffect(() => {
        if(products.length === 0) getData();        
    }, [])
    
    return(
        <>
            {load && <Loader />}
            {error && !load && <ErrorButton onClickHandler={getData} errorMessage={error} />}
            {products.length === 0 &&
                <div className="search-message">По запросу ничего не найдено!</div>
            }
            {
            <div className="row">
                { products.map(product => ProductPrevueCard(product)) }                
            </div>            
            }
            {moreLoad && <Loader />}
            {errorMore && !moreLoad && <ErrorButton onClickHandler={getMoreData} errorMessage={errorMore} />}
            {!errorMore && !moreLoad && <MoreProducts />}
        </>
    )
}

