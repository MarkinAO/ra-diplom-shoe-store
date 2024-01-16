import { useDispatch, useSelector } from "react-redux";
import { getProductCard } from "../shared/model/productCardSlice";
import type { RootState } from "../shared/model/store";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../shared/ui/Loader";
import { addProduct } from "../shared/model/cartSlice";
import ErrorButton from "../shared/ui/ErrorButton";

export default function ProductCard() {
    const { product, load, error } = useSelector((state: RootState) => state.productCard);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [count, setCount] = useState(1);
    const [activeSize, setActiveSize] = useState('');
    const navigate = useNavigate();
    const getData = (id: string) => {
        dispatch(getProductCard(id))
    }

    useEffect(() => {
        id && getData(id)
    }, [])

    return(
        <>
            {<ErrorButton onClickHandler={getData} errorMessage={error} props={id} />}
            {load && <Loader />}
            {!load &&
            <section className="catalog-item">
                <h2 className="text-center">{product?.title}</h2>
                <div className="row">
                    <div className="col-5">
                        <img src={product?.images[0]} className="img-fluid" alt={product?.title} />
                    </div>
                    <div className="col-7">
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td>Цена</td>
                                    <td>{product?.price} руб.</td>
                                </tr>
                                <tr>
                                    <td>Артикул</td>
                                    <td>{product?.sku}</td>
                                </tr>
                                <tr>
                                    <td>Производитель</td>
                                    <td>{product?.manufacturer}</td>
                                </tr>
                                <tr>
                                    <td>Цвет</td>
                                    <td>{product?.color}</td>
                                </tr>
                                <tr>
                                    <td>Материалы</td>
                                    <td>{product?.material}</td>
                                </tr>
                                <tr>
                                    <td>Сезон</td>
                                    <td>{product?.season}</td>
                                </tr>
                                <tr>
                                    <td>Повод</td>
                                    <td>{product?.reason}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="text-center">
                            <p>Размеры в наличии: 
                                {product?.sizes.map(size => {
                                    if(size.available) return <span 
                                                                className={activeSize === size.size ? 'catalog-item-size selected' : 'catalog-item-size'}
                                                                onClick={() => {
                                                                    setActiveSize(size.size)
                                                                }}
                                                                key={size.size}
                                                              >{size.size}</span>
                                })}
                            </p>
                            {product?.sizes && product?.sizes.length > 0 &&
                                <p>Количество: 
                                    <span className="btn-group btn-group-sm pl-2">
                                        <button 
                                            className="btn btn-secondary" 
                                            onClick={() => {
                                                const newCount = count > 1 ? count - 1 : 1;
                                                setCount(newCount);
                                            }}
                                        >-</button>
                                        <span className="btn btn-outline-primary">{count}</span>
                                        <button 
                                            className="btn btn-secondary"
                                            onClick={() => {
                                                const newCount = count < 10 ? count + 1 : 10;
                                                setCount(newCount);
                                            }}
                                        >+</button>
                                    </span>
                                </p>
                            }
                        </div>
                        {product?.sizes && product?.sizes?.length > 0 &&
                            <button 
                                className="btn btn-danger btn-block btn-lg"
                                onClick={() => {
                                    if(!activeSize) return;
                                    dispatch(addProduct({product, count, size: activeSize}));                                    
                                    navigate('/Cart');
                                }}
                            >В корзину</button>
                        }
                    </div>
                </div>
            </section>
            }
        </>        
    )
}