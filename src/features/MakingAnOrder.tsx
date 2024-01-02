import { clearCart } from "../shared/api/localStorageManager";
import type { RootState } from "../shared/model/store";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { sendOrder, setCartData } from "../shared/model/cartSlice";
import Loader from "../shared/ui/Loader";

export default function MakingAnOrder() {
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const { products, load, orderComplete } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();

    return(
        <>
        {load && <Loader />}
            {orderComplete &&
                <section className="order">
                    <h2 className="text-center">Заказ оформлен!</h2>                
                </section>
            }
            {!load && !orderComplete &&
            <section className="order">
                <h2 className="text-center">Оформить заказ</h2>
                <div className="card" style={{maxWidth: '30rem', margin: '0 auto'}}>
                <form 
                    className="card-body"
                    onSubmit={(e) => {
                        e.preventDefault()
                        dispatch(sendOrder({phone, address, items: products}))
                        setPhone('')
                        setAddress('')
                        clearCart()
                        dispatch(setCartData([]))
                    }}
                >
                    <div className="form-group">
                        <label htmlFor="phone">Телефон</label>
                        <input 
                            className="form-control" 
                            id="phone" 
                            placeholder="Ваш телефон" 
                            value={phone}
                            onChange={(e) => {
                                setPhone(e.target.value)
                            }}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Адрес доставки</label>
                        <input 
                            className="form-control" 
                            id="address" 
                            placeholder="Адрес доставки" 
                            value={address}
                            onChange={(e) => {
                                setAddress(e.target.value)
                            }}
                            required
                        />
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="agreement" checked readOnly/>
                        <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                    </div>
                    <button type="submit" className="btn btn-outline-secondary">Оформить</button>
                </form>
                </div>
            </section>
            }
        </>
    )
}