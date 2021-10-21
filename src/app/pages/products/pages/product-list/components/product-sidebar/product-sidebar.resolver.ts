import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsService } from '@pages/products/products.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductSidebarResolver implements Resolve<boolean> {
  constructor(private readonly product: ProductsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.params['categoryId'];
    return this.product.getCategory().pipe(
      map((cate: any) => {
        const result = cate.filter((t: any) => t.id === id);
        return {
          result,
          category: cate,
        };
      })
    );
  }
}
