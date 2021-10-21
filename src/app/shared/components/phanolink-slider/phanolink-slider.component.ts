import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'phanolink-slider',
  templateUrl: './phanolink-slider.component.html',
  styleUrls: ['./phanolink-slider.component.scss'],
})
export class PhanolinkSliderComponent {
  customOptions: OwlOptions = {
    loop: true,
    dots: true,
    mouseDrag: true,
    items: 1,
    center: true,
    nav: false,
    autoplay: true,
    autoplaySpeed: 200,
    responsive: {
      992: {
        items: 1,
      },
      768: {
        items: 1,
      },
      575: {
        items: 1,
      },
    },
  };
  constructor() {}
}
