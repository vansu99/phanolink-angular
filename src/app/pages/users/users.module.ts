import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { usersRoutes } from '@pages/users/users.routes';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { UserSidebarComponent } from './components/user-sidebar/user-sidebar.component';
import { PhanolinkBreadcrumbModule } from '@shared/components/phanolink-breadcrumb/phanolink-breadcrumb.module';

@NgModule({
  declarations: [UsersComponent, UserInfoComponent, UserOrdersComponent, UserSidebarComponent],
  imports: [
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    PhanolinkBreadcrumbModule,
    RouterModule.forChild(usersRoutes),
  ]
})
export class UsersModule {}
