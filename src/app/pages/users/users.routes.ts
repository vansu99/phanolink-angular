import { Routes } from '@angular/router';
import { UsersComponent } from '@pages/users/users.component';
import { UserInfoComponent } from '@pages/users/components/user-info/user-info.component';

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
    ],
  },
];
