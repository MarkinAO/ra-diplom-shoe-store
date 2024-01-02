import type { itemOfCart } from "../model/model";

export function setCart(products: itemOfCart[]) {
    const data = JSON.stringify(products);    
    window.localStorage.setItem('cart', data);
}

export function getCart(): itemOfCart[] {
    const data = window.localStorage.getItem('cart');
    const result = data ? JSON.parse(data) : [];
    return result;
}

export function clearCart() {
    window.localStorage.clear();
}