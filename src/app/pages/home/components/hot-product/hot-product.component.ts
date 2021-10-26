import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HomeService } from '@pages/home/home.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'phanolink-hot-product',
  templateUrl: './hot-product.component.html',
  styleUrls: ['./hot-product.component.scss'],
})
export class HotProductComponent implements OnInit {
  customOption: OwlOptions = {
    loop: true,
    dots: true,
    mouseDrag: true,
    center: false,
    nav: false,
    autoWidth: false,
    margin: 10,
    responsive: {
      0: {
        items: 2,
        margin: 0,
        dots: false,
        loop: false,
      },
      480: {
        items: 4,
        margin: 5,
        loop: false,
      },
      769: {
        items: 4,
        margin: 10,
      },
      1000: {
        items: 4,
        margin: 10,
      },
    },
  };
  saleProduct!: Observable<any>;

  constructor(private readonly home: HomeService) {
    this.saleProduct = this.home.productSale$;
  }

  ngOnInit() {
    this.loadSaleProduct();
  }

  loadSaleProduct() {
    this.home.getProductSale();
  }
}
