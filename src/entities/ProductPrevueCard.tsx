import { Link } from "react-router-dom";
import type { product } from "../shared/model/model";
import { v4 as uuidv4 } from "uuid";
import defaultPhoto from "../assets/defaultPhoto.webp";

export default function ProductPrevueCard(product: product) {
    const title = product.title.length > 30 ? product.title.slice(0, 30) + "..." : product.title;
    return(
        <div className="col-4" key={uuidv4()}>
            <div className="card catalog-item-card">
                <div className="card-img-top img-fluid img-bckg" style={{backgroundImage: `url(${product.images[0] || defaultPhoto})`}}></div>
                <div className="card-body">
                    <p className="card-text">{title}</p>
                    <p className="card-text">{product.price} руб.</p>
                    <Link to={`/catalog/${product.id}`} className="btn btn-outline-primary">Заказать</Link>
                </div>
            </div>
        </div>
    )
}