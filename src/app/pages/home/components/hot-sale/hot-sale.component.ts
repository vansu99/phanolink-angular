import {Component, OnInit} from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {HomeService} from "@pages/home/home.service";
import {Observable} from "rxjs";

@Component({
  selector: 'phanolink-hot-sale',
  templateUrl: './hot-sale.component.html',
  styleUrls: ['./hot-sale.component.scss'],
})
export class HotSaleComponent implements OnInit {
  customOption: OwlOptions = {
    loop: true,
    dots: true,
    mouseDrag: true,
    center: false,
    nav: false,
    autoWidth: false,
    margin: 15,
    autoplay: true,
    autoplaySpeed: 600,
    responsive: {
      0: {
        items: 1,
        margin: 0,
        loop: false,
      },
      400: {
        items: 2,
        margin: 5,
        loop: false,
      },
      768: {
        items: 2,
        margin: 5,
        loop: false,
      },
      1024: {
        items: 3,
      },
    },
  };
  hotProduct!: Observable<any>

  constructor(private readonly home: HomeService) {
    this.hotProduct = this.home.productHot$
  }

  ngOnInit(): void {
    this.home.getProductHot()
  }
}
