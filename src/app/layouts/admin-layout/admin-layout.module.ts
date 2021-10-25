import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { adminRoutes } from '@layouts/admin-layout/admin-layout.routes';
import {AuthModule} from "@features/auth/auth.module";

@NgModule({
  declarations: [AdminLayoutComponent, AdminHeaderComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    AuthModule,
    RouterModule.forChild(adminRoutes),
  ],
})
export class AdminLayoutModule {}
