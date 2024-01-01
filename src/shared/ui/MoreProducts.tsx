import { useDispatch, useSelector } from "react-redux";
import { getMoreProducts } from "../../shared/model/productsSlice";
import type { RootState } from "../../shared/model/store";

export default function MoreProducts() {
    const { isMoreProducts, load } = useSelector((state: RootState) => state.products)
    const dispatch = useDispatch();

    const onClickHandler = () => {
        dispatch(getMoreProducts())
    }
    
    return(
        <>
            {isMoreProducts && !load &&
            <div className="text-center">
                <button 
                    className="btn btn-outline-primary"
                    onClick={onClickHandler}
                >Загрузить ещё</button>
            </div>
            }
        </>        
    )
}