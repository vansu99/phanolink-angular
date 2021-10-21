import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsService } from '@pages/products/products.service';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailResolver implements Resolve<boolean> {
  constructor(private readonly product: ProductsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const id = route.params['id'];
    return this.product.getDetailProduct(id);
  }
}
