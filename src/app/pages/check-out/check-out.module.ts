import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckOutComponent } from './check-out.component';
import { PhanolinkBreadcrumbModule } from '@shared/components/phanolink-breadcrumb/phanolink-breadcrumb.module';
import { RouterModule } from '@angular/router';
import { checkOutRoutes } from '@pages/check-out/check-out.routes';

@NgModule({
  declarations: [CheckOutComponent],
  imports: [CommonModule, PhanolinkBreadcrumbModule, RouterModule.forChild(checkOutRoutes)],
})
export class CheckOutModule {}
