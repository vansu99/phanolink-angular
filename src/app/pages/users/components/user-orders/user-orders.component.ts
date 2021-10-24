import { Component, OnInit } from '@angular/core';
import { UsersService } from '@pages/users/users.service';
import { Observable } from 'rxjs';
import { OrderState } from '@pages/users/users.model';

@Component({
  selector: 'phanolink-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss'],
  host: {
    class: 'userOrder',
  },
})
export class UserOrdersComponent implements OnInit {
  orderList!: Observable<OrderState[]>;

  constructor(private readonly users: UsersService) {
    this.orderList = this.users.orders$;
  }

  ngOnInit(): void {
    this.users.getOrders();
  }
}
