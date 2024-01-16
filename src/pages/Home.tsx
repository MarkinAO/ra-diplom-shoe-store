import HitsList from "../widgets/HitsList";
import ProductsList from "../widgets/ProductsList";
import Categories from "../widgets/Categories";

export default function Home() {
    return(
        <>
            <HitsList />
            <section className="catalog">
                <h2 className="text-center">Каталог</h2>
                <Categories />
                <ProductsList />
            </section>
        </>
    )
}