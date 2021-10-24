import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { PublicLayoutComponent } from '@layouts/public-layout/public-layout.component';

export const publicRoutes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    data: { breadcrumb: 'Trang chủ' },
    children: [
      {
        path: '',
        loadChildren: () => import('@pages/home/home.module').then((m) => m.HomeModule),
        pathMatch: 'full',
      },
      {
        path: 'products',
        loadChildren: () => import('@pages/products/products.module').then((m) => m.ProductsModule),
      },
      {
        path: 'user',
        loadChildren: () => import('@pages/users/users.module').then((m) => m.UsersModule),
        canLoad: [AuthGuard],
      },
      {
        path: '**',
        component: NotFoundComponent,
        data: {
          breadcrumb: '404 không tìm thấy liên kết',
        },
        pathMatch: 'full',
      },
    ],
  },
];
