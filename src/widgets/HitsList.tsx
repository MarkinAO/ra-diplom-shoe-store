import { useSelector } from "react-redux";
import type { RootState } from "../shared/model/store";
import Loader from "../shared/ui/Loader";
import ProductPrevueCard from "../entities/ProductPrevueCard";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { getHits } from "../shared/model/hitsSlice";

export default function HitsList() {
    const { hits, load } = useSelector((state: RootState) => state.hits)
    const dispatch = useDispatch();
   
    useEffect(() => {
        dispatch(getHits());
    }, [])
    
    return(
        <>
            {load && <Loader />}
            {!load && 
            <section className="top-sales">
                <h2 className="text-center">Хиты продаж!</h2>
                <div className="row">
                    { hits.map(product => ProductPrevueCard(product)) }                
                </div>  
            </section>                          
            }
        </>
    )
}

