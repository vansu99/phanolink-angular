import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { CartState } from '@pages/cart/cart.model';
import { STORAGE_KEYS, StorageService } from '@core/services/storage.service';
import { ApiService } from '@core/services/api.service';
import { Router } from '@angular/router';

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

  constructor(
    private readonly storage: StorageService,
    private readonly api: ApiService,
    private readonly router: Router
  ) {}

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
    return this.api.post('order', value).subscribe((response) => {
      const order = {
        ...value,
        id: response.body.data.id,
      };
      this.paymentCart.next(order);
      this.storage.setObject(STORAGE_KEYS.PAYMENT, order);
      this.cartListSubject.next([]);
      this.storage.remove(STORAGE_KEYS.CART);
      this.router.navigate(['/checkout/success']);
    });
  }
}
