import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscountPipe } from '@shared/pipes/discount.pipe';
import { ProductsService } from '@pages/products/products.service';
import { CartService } from '@pages/cart/cart.service';
import { CartState } from '@pages/cart/cart.model';
import { ProductState } from '@pages/products/products.model';

@Component({
  selector: 'phanolink-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  providers: [DiscountPipe],
})
export class ProductDetailComponent implements OnInit {
  quantity = 1;
  productDetail: any = {};

  constructor(
    private readonly product: ProductsService,
    private readonly discount: DiscountPipe,
    private readonly activated: ActivatedRoute,
    private readonly cart: CartService
  ) {}

  ngOnInit(): void {
    this.loadProductDetail();
  }

  loadProductDetail() {
    this.activated.data.subscribe((data) => {
      this.productDetail = data.product;
    });
  }

  handleIncreaseQuantity() {
    return (this.quantity += 1);
  }

  handleDecreaseQuantity() {
    if (this.quantity > 1) {
      return (this.quantity -= 1);
    }
    return;
  }

  addToCart() {
    const cartItem: CartState = {
      id: this.productDetail.id,
      title: this.productDetail.name,
      price: this.discount.transform(
        this.productDetail.original_price,
        <number>this.productDetail.discount
      ),
      discount: this.productDetail.discount,
      original_price: this.productDetail.original_price,
      thumbnail: this.productDetail.img_path,
      quantity: this.quantity,
    };
    this.cart.addToCart(cartItem);
  }
}
