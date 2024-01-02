import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../shared/model/store";
import Loader from "../shared/ui/Loader";
import ProductPrevueCard from "../entities/ProductPrevueCard";
import { useEffect } from "react";
import { getProducts } from "../shared/model/productsSlice";
import MoreProducts from "../shared/ui/MoreProducts";

export default function ProductsList() {
    const { products, load } = useSelector((state: RootState) => state.products);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(products.length === 0) dispatch(getProducts());        
    }, [])
    
    return(
        <>
            {products.length === 0 &&
            <div className="search-message">По запросу ничего не найдено!</div>
            }
            {
            <div className="row">
                { products.map(product => ProductPrevueCard(product)) }                
            </div>            
            }
            {load && <Loader />}
            <MoreProducts />
        </>
    )
}

