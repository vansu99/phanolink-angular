import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { SliderState } from '@shared/components/phanolink-slider/phanolink-slider.model';
import { HomeService } from '@pages/home/home.service';

@Component({
  selector: 'phanolink-slider',
  templateUrl: './phanolink-slider.component.html',
  styleUrls: ['./phanolink-slider.component.scss'],
})
export class PhanolinkSliderComponent implements OnInit {
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
  sliderList!: Observable<SliderState[]>;

  constructor(private readonly homeService: HomeService) {
    this.sliderList = this.homeService.slideList$;
  }

  ngOnInit(): void {
    this.loadCategory();
  }

  loadCategory() {
    this.homeService.getSlides();
  }
}
