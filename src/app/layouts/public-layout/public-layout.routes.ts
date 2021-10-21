import { Routes } from '@angular/router';
import { PublicLayoutComponent } from '@layouts/public-layout/public-layout.component';

export const publicRoutes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@pages/home/home.module').then((m) => m.HomeModule),
        pathMatch: 'full',
      },
    ],
  },
];
