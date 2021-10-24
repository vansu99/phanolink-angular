import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { BehaviorSubject } from 'rxjs';
import {OrderState} from "@pages/users/users.model";

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private orderSubject = new BehaviorSubject<OrderState[]>([]);
  orders$ = this.orderSubject.asObservable();

  constructor(private readonly api: ApiService) {}

  updateUserInfo(user: any) {
    return this.api.put('change-info', user);
  }

  getOrders() {
    return this.api.get('order').subscribe((res) => {
      this.orderSubject.next([...res.body.data]);
    });
  }
}
