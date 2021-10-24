import { Component, OnInit } from '@angular/core';
import {CartService} from "@pages/cart/cart.service";
import {CartState} from "@pages/cart/cart.model";

@Component({
  selector: 'phanolink-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
  cartList: CartState[] = [];
  totalPayment: number = 0;
  tempPrice: number = 0;

  constructor(private readonly cart: CartService) { }

  ngOnInit(): void {
    this.cart.paymentCart$.subscribe((cart) => {
      this.totalPayment = cart.total;
      this.cartList = cart.carts;
      this.tempPrice = cart.tempPrice;
    });
  }

}
