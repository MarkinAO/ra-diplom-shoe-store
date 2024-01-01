import { useDispatch, useSelector } from "react-redux";
import { getCategories, setActiveCategory } from "../shared/model/categoriesSlice";
import type { RootState } from "../shared/model/store";
import { useEffect } from "react";

export default function Categories() {
    const { categories, load, activeCategory } = useSelector((state: RootState) => state.categories)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories())
    }, [])

    return(
        <ul className="catalog-categories nav justify-content-center">
            {!load &&
                categories.map(cat => {
                    const newClass = activeCategory === cat.id ? 'nav-link' : 'nav-link active'
                    return  <li className="nav-item" key={cat.id}>
                                <a 
                                    className={newClass} 
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        dispatch(setActiveCategory(cat.id))
                                    }}
                                >{cat.title}</a>
                            </li>
                })
            }
        </ul>
    )
}