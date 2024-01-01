import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../shared/model/store";
import { deleteProduct } from "../shared/model/cartSlice";
import { Link } from "react-router-dom";

export default function Cart() {
    const { products } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();
    let count = 1;
    const totalPrice = products.reduce((acc, prod) => {
        return acc = acc + prod.product.price * prod.count;
    }, 0)    

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
            <section className="order">
                <h2 className="text-center">Оформить заказ</h2>
                <div className="card" style={{maxWidth: '30rem', margin: '0 auto'}}>
                <form className="card-body">
                    <div className="form-group">
                    <label htmlFor="phone">Телефон</label>
                    <input className="form-control" id="phone" placeholder="Ваш телефон"/>
                    </div>
                    <div className="form-group">
                    <label htmlFor="address">Адрес доставки</label>
                    <input className="form-control" id="address" placeholder="Адрес доставки"/>
                    </div>
                    <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="agreement"/>
                    <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                    </div>
                    <button type="submit" className="btn btn-outline-secondary">Оформить</button>
                </form>
                </div>
            </section>
        </>
    )
}