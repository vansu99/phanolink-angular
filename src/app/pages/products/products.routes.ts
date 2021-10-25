import { Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailResolver } from './pages/product-detail/product-detail.resolver';
import { ProductSidebarResolver } from './pages/product-list/components/product-sidebar/product-sidebar.resolver';

export const productsRoutes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: '',
        component: ProductListComponent,
        resolve: { cate: ProductSidebarResolver },
      },
      {
        path: ':categoryId',
        data: {
          breadcrumb: (data: any) => `${data.cate.result[0]?.name}`,
        },
        resolve: { cate: ProductSidebarResolver },
        children: [
          {
            path: '',
            component: ProductListComponent,
            pathMatch: 'full',
            data: {
              breadcrumb: null,
            },
          },
          {
            path: 'de/:id',
            component: ProductDetailComponent,
            data: {
              breadcrumb: (data: any) => `${data.product.name}`,
            },
            resolve: { product: ProductDetailResolver },
          },
        ],
      },
    ],
  },
];
