import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { CartState } from '@pages/cart/cart.model';
import { STORAGE_KEYS, StorageService } from '@core/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartList: CartState[] = this.storage.getValue(STORAGE_KEYS.CART) || [];

  private cartListSubject = new BehaviorSubject<any>(
    this.storage.getValue<any[]>(STORAGE_KEYS.CART) || []
  );
  cartList$ = this.cartListSubject.asObservable();

  private paymentCart = new BehaviorSubject<any>(
    this.storage.getValue<any[]>(STORAGE_KEYS.PAYMENT) || {}
  );
  paymentCart$ = this.paymentCart.asObservable();

  constructor(private readonly storage: StorageService) {}

  addToCart(product: CartState) {
    const index = this.cartList.findIndex((cart: CartState) => cart.id === product.id);
    if (index >= 0) {
      this.cartList[index].quantity += product.quantity;
    } else {
      this.cartList.push(product);
    }
    this.cartListSubject.next(this.cartList);
    this.storage.setObject(STORAGE_KEYS.CART, this.cartList);
  }

  setQuantity(state: any) {
    const { id, quantity } = state;
    const index = this.cartList.findIndex((cart: any) => cart.id === id);
    if (index >= 0) {
      this.cartList[index].quantity = quantity;
      this.cartListSubject.next(this.cartList);
      this.storage.setObject(STORAGE_KEYS.CART, this.cartList);
    }
  }

  removeCartItem(id: number | string) {
    const index = this.cartList.findIndex((cart: any) => cart.id === id);
    if (index !== -1) {
      this.cartList.splice(index, 1);
      this.cartListSubject.next(this.cartList);
      this.storage.setObject(STORAGE_KEYS.CART, this.cartList);
    }
  }

  setPaymentCart(value: any) {
    console.log(value)
    // call api create order
    this.paymentCart.next(value);
    this.storage.setObject(STORAGE_KEYS.PAYMENT, value);
    this.cartListSubject.next([]);
    this.storage.remove(STORAGE_KEYS.CART);
  }
}
