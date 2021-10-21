import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeTitleFormPipe } from '@shared/pipes/change-title-form.pipe';
import { RouterModule } from '@angular/router';
import { PhanolinkSliderComponent } from './components/phanolink-slider/phanolink-slider.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { PricePipe } from './pipes/price.pipe';
import { DiscountPipe } from './pipes/discount.pipe';

@NgModule({
  declarations: [ChangeTitleFormPipe, PhanolinkSliderComponent, PricePipe, DiscountPipe],
  imports: [CommonModule, RouterModule, CarouselModule],
  exports: [ChangeTitleFormPipe, PhanolinkSliderComponent, PricePipe, DiscountPipe],
})
export class SharedModule {}
