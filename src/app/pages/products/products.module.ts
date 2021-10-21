import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { productsRoutes } from '@pages/products/products.routes';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { PhanolinkPaginatorModule } from '@shared/components/phanolink-paginator/phanolink-paginator.module';
import { PhanolinkBreadcrumbModule } from '@shared/components/phanolink-breadcrumb/phanolink-breadcrumb.module';
import { PhanolinkSkeletonModule } from '@shared/components/phanolink-skeleton/phanolink-skeleton.module';
import { ProductSidebarComponent } from './pages/product-list/components/product-sidebar/product-sidebar.component';
import { ProductFilterComponent } from './pages/product-list/components/product-filter/product-filter.component';
import { ProductNotfoundComponent } from './pages/product-list/components/product-notfound/product-notfound.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductListComponent,
    ProductSidebarComponent,
    ProductFilterComponent,
    ProductNotfoundComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    PhanolinkPaginatorModule,
    PhanolinkBreadcrumbModule,
    PhanolinkSkeletonModule,
    RouterModule.forChild(productsRoutes),
  ],
})
export class ProductsModule {}
