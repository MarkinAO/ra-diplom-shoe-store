import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../shared/model/store";
import { deleteProduct } from "../shared/model/cartSlice";
import { Link } from "react-router-dom";
import { setCart } from "../shared/api/localStorageManager";
import { useEffect } from "react";
import MakingAnOrder from "../features/makingAnOrder";

export default function Cart() {
    const { products } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();
    let count = 1;
    const totalPrice = products.reduce((acc, prod) => {
        return acc = acc + prod.product.price * prod.count;
    }, 0)

    useEffect(() => {        
        setCart(products);
    }, [products])

    return(
        <>            
            <section className="cart">
                <h2 className="text-center">Корзина</h2>
                <table className="table table-bordered">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Название</th>
                    <th scope="col">Размер</th>
                    <th scope="col">Кол-во</th>
                    <th scope="col">Стоимость</th>
                    <th scope="col">Итого</th>
                    <th scope="col">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(prod => {
                            return  <tr key={prod.product.id}>
                                        <td scope="row">{count++}</td>
                                        <td><Link to={`/catalog/${prod.product.id}`}>{prod.product.title}</Link></td>
                                        <td>{prod.size}</td>
                                        <td>{prod.count}</td>
                                        <td>{prod.product.price} руб.</td>
                                        <td>{prod.product.price * prod.count} руб.</td>
                                        <td>
                                            <button 
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() => {
                                                    dispatch(deleteProduct(prod.product.id))
                                                }}
                                            >Удалить</button>
                                        </td>
                                    </tr>
                        })}
                    <tr>
                        <td colSpan={5} className="text-right">Общая стоимость</td>
                        <td>{totalPrice} руб.</td>
                    </tr>
                </tbody>
                </table>
            </section>
            <MakingAnOrder />
        </>
    )
}