import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { BehaviorSubject } from 'rxjs';
import { OrderState } from '@pages/users/users.model';
import * as queryString from 'query-string';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private orderSubject = new BehaviorSubject<OrderState[]>([]);
  orders$ = this.orderSubject.asObservable();

  private paginationSubject = new BehaviorSubject<any>(null);
  pagination$ = this.paginationSubject.asObservable();

  constructor(private readonly api: ApiService) {}

  updateUserInfo(user: any) {
    return this.api.put('change-info', user);
  }

  getOrders(obj?: any) {
    const queryParams = queryString.stringify(obj);
    if (queryParams) {
      return this.api.get(`order?${queryParams}`).subscribe((res) => {
        this.orderSubject.next([...res.body.data]);
        this.paginationSubject.next(res.body.pagination);
      });
    } else {
      return this.api.get(`order`).subscribe((res) => {
        this.orderSubject.next([...res.body.data]);
        this.paginationSubject.next(res.body.pagination);
      });
    }
  }
}
