import ProductsList from "../widgets/ProductsList";
import Categories from "../widgets/Categories";
import Search from "../widgets/Search";

export default function Catalog() {
    return(
        <>      
            <section className="catalog">
                <h2 className="text-center">Каталог</h2>
                <Search />
                <Categories />
                <ProductsList />
            </section>
        </>
    )
}