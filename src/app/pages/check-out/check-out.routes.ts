import { Routes } from '@angular/router';
import { CheckOutComponent } from './check-out.component';

export const checkOutRoutes: Routes = [
  {
    path: '',
    component: CheckOutComponent,
    data: {
      breadcrumb: 'Giỏ hàng',
    },
    children: [],
  },
];
