import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'phanolink-hot-product',
  templateUrl: './hot-product.component.html',
  styleUrls: ['./hot-product.component.scss'],
})
export class HotProductComponent  {
  customOption: OwlOptions = {
    loop: true,
    dots: true,
    mouseDrag: true,
    center: false,
    nav: false,
    autoWidth: false,
    margin: 10,
    items: 2,
    responsive: {
      0: {
        items: 1,
        margin: 0,
        loop: false,
      },
      480: {
        items: 2,
        margin: 5,
        loop: false,
      },
      769: {
        items: 2,
        margin: 10,
      },
      1000: {
        items: 2,
      },
    },
  };
  constructor() {}


}
