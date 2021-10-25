import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('@layouts/admin-layout/admin-layout.module').then((m) => m.AdminLayoutModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('@layouts/public-layout/public-layout.module').then((m) => m.PublicLayoutModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
