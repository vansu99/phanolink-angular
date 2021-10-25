import { Routes } from '@angular/router';
import { UsersComponent } from '@pages/users/users.component';
import { UserInfoComponent } from '@pages/users/components/user-info/user-info.component';
import { UserOrdersComponent } from '@pages/users/components/user-orders/user-orders.component';

export const usersRoutes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'account/profile',
        component: UserInfoComponent,
        data: {
          breadcrumb: 'Thông tin tài khoản',
        },
      },
      {
        path: 'purchase',
        component: UserOrdersComponent,
        data: {
          breadcrumb: 'Quản lý đơn hàng',
        },
      },
    ],
  },
];
