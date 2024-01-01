import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, getSearch } from "../shared/model/productsSlice";
import type { RootState } from "../shared/model/store";

export default function Search() {
    const { searchQuery } = useSelector((state: RootState) => state.products);
    const dispatch = useDispatch();

    return(
        <form 
            className={"catalog-search-form form-inline"}
            onSubmit={(e) => {
                e.preventDefault();
                dispatch(getSearch(searchQuery));
            }}>
                <input 
                    id="searchForm"
                    className="form-control" 
                    placeholder="Поиск" 
                    value={searchQuery}
                    onChange={(e) => {
                        dispatch(setSearchQuery(e.target.value))
                    }}
                />
        </form>
    )
}