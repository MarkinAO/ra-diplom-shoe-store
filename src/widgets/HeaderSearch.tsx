import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, getSearch } from "../shared/model/productsSlice";
import type { RootState } from "../shared/model/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HeaderSearch() {
    const { searchQuery } = useSelector((state: RootState) => state.products);
    const dispatch = useDispatch();
    const [focus, setFocus] = useState(false);
    const navigate = useNavigate();

    const submitHandler = () => {
        setFocus(false);
        dispatch(getSearch(searchQuery));
        navigate('/Catalog');        
    }

    return(
        <>  
            <div 
                data-id="search-expander" 
                className="header-controls-pic header-controls-search"
                onClick={() => {
                    if(!focus) setFocus(true);
                    if(focus) submitHandler();
                }}
            ></div>
            {focus &&
                <form 
                    className={'header-controls-search-form form-inline'}
                    onSubmit={(e) => {
                        e.preventDefault();
                        submitHandler();
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
            }            
        </>
        
    )
}