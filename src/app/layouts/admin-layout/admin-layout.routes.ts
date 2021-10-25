import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';
import { LoginComponent } from '@features/auth/login/login.component';
import { AuthGuard } from '@core/guards/auth.guard';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'dashboard',
        loadChildren: () => import('@pages/admin/admin.module').then((m) => m.AdminModule),
        canLoad: [AuthGuard],
      },
    ],
  },
];
