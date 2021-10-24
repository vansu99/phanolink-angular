import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckOutComponent } from './check-out.component';
import { PhanolinkBreadcrumbModule } from '@shared/components/phanolink-breadcrumb/phanolink-breadcrumb.module';
import { RouterModule } from '@angular/router';
import { checkOutRoutes } from '@pages/check-out/check-out.routes';
import {SharedModule} from "@shared/shared.module";
import { CheckoutFailComponent } from './components/checkout-fail/checkout-fail.component';
import { CheckoutSuccessComponent } from './components/checkout-success/checkout-success.component';

@NgModule({
  declarations: [CheckOutComponent, CheckoutFailComponent, CheckoutSuccessComponent],
  imports: [CommonModule, PhanolinkBreadcrumbModule, RouterModule.forChild(checkOutRoutes), SharedModule],
})
export class CheckOutModule {}
