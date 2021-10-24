import { Routes } from '@angular/router';
import { CheckOutComponent } from './check-out.component';
import { CheckoutFailComponent } from '@pages/check-out/components/checkout-fail/checkout-fail.component';
import { CheckoutSuccessComponent } from '@pages/check-out/components/checkout-success/checkout-success.component';

export const checkOutRoutes: Routes = [
  {
    path: '',
    component: CheckOutComponent,
    data: {
      breadcrumb: 'Giỏ hàng',
    },
    children: [
      { path: 'success', component: CheckoutSuccessComponent },
      { path: 'fail', component: CheckoutFailComponent },
    ],
  },
];
