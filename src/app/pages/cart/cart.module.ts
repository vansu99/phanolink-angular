import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { CartEmptyComponent } from './components/cart-empty/cart-empty.component';
import { AuthModule } from '@features/auth/auth.module';
import { RouterModule } from '@angular/router';
import { cartRoutes } from '@pages/cart/cart.routes';
import { SharedModule } from '@shared/shared.module';
import {PhanolinkBreadcrumbModule} from "@shared/components/phanolink-breadcrumb/phanolink-breadcrumb.module";

@NgModule({
  declarations: [CartComponent, CartEmptyComponent],
  imports: [AuthModule, CommonModule, SharedModule, RouterModule.forChild(cartRoutes), PhanolinkBreadcrumbModule],
})
export class CartModule {}
