import { Component } from '@angular/core';
import { CartState } from '@pages/cart/cart.model';
import { Router } from '@angular/router';
import { AuthService } from '@features/auth/auth.service';
import { CartService } from '@pages/cart/cart.service';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { DialogFormComponent } from '@layouts/public-layout/components/phanolink-header/modals/dialog-form/dialog-form.component';

@Component({
  selector: 'phanolink-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cartList: CartState[] = [];
  cartLength = 0;
  totalPrice = 0;

  constructor(
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly auth: AuthService,
    private readonly cart: CartService
  ) {
    this.loadCartList();
  }

  loadCartList() {
    this.cart.cartList$
      .pipe(
        map((carts) => {
          return {
            cartLength: carts.length,
            cartList: carts,
          };
        })
      )
      .subscribe((response) => {
        this.cartLength = response.cartLength;
        this.cartList = response.cartList;
      });
  }

  handleOrder() {
    this.auth.isAuthenticated$.subscribe((isAuth) => {
      if (!isAuth) {
        this.dialog.open(DialogFormComponent, {
          width: '470px',
          panelClass: 'custom-dialog-form',
          data: { isLoginActive: true },
        });
      } else {
        const order = {
          id: Math.floor(Math.random() * 99),
          carts: this.cartList,
          tempPrice: this.totalPrice,
          total: this.handleTotalPayment(20, 15),
        };
        this.cart.setPaymentCart(order);
        this.router.navigate(['/checkout/success']);
      }
    });
  }

  handleTotal(discount?: number): number {
    if (discount) {
      this.totalPrice =
        this.cartList.reduce((acc, cur) => acc + cur.price * cur.quantity, 0) - discount;
      return this.totalPrice;
    } else {
      this.totalPrice = this.cartList.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
      return this.totalPrice;
    }
  }

  handleTotalPayment(discount?: number, ship: number = 0): number {
    if (discount) {
      return this.handleTotal(discount) + ship;
    } else {
      return this.handleTotal() + ship;
    }
  }

  handleIncreaseQuantity(id: string | number, quantity: number): void {
    if (quantity) {
      quantity += 1;
      this.cart.setQuantity({ id, quantity });
    }
  }

  handleDecreaseQuantity(id: string | number, quantity: number): void {
    if (quantity) {
      quantity -= 1;
      this.cart.setQuantity({ id, quantity });
    }
  }

  removeCart(id: number | string): void {
    this.cart.removeCartItem(id);
  }
}
