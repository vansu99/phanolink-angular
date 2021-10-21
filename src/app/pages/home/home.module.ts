import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HotProductComponent } from './components/hot-product/hot-product.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HotSaleComponent } from './components/hot-sale/hot-sale.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { RouterModule } from '@angular/router';
import { homeRoutes } from '@pages/home/home.routes';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [HomeComponent, HotProductComponent, HotSaleComponent, CategoryListComponent],
  imports: [CommonModule, SharedModule, CarouselModule, RouterModule.forChild(homeRoutes)],
})
export class HomeModule {}
