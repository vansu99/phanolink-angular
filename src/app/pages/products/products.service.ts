import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as queryString from 'query-string';
import { PaginatorService } from '@shared/components/phanolink-paginator/paginator.service';
import { ApiService } from '@core/services/api.service';
import { finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productSubject = new BehaviorSubject<any>([]);
  product$ = this.productSubject.asObservable();

  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  constructor(private readonly api: ApiService, private readonly paginator: PaginatorService) {}

  getProducts(obj?: any) {
    const queryParams = queryString.stringify(obj);
    this.isLoadingSubject.next(true);
    return this.api
      .get(`home?${queryParams}`)
      .pipe(
        map(({ body }) => {
          return {
            product: body.data,
            totalItems: body.pagination?.total || 0,
            page: body.pagination?.currentPage || 1,
          };
        }),
        finalize(() => this.isLoadingSubject.next(false))
      )
      .subscribe(({ totalItems, product, page }) => {
        this.productSubject.next(product);
        const pager = this.paginator.getPager(totalItems, page);
        this.paginator.pagination.next({
          currentPage: pager.currentPage,
          limit: 20,
          totalPage: pager.pages
        });
      });
  }

  getProductByCategoryId(id: number | string, obj?: any) {
    const queryParams = queryString.stringify(obj);
    this.isLoadingSubject.next(true);
    return this.api
      .get(`categories/${id}?${queryParams}`)
      .pipe(
        map((product) => {
          return {
            product: product.body.data,
            totalItems: product.body.pagination?.total,
            page: product.body.pagination?.currentPage,
          };
        }),
        finalize(() => this.isLoadingSubject.next(false))
      )
      .subscribe(({ totalItems, product, page }) => {
        this.productSubject.next(product);
        const pager = this.paginator.getPager(totalItems, page);
        this.paginator.pagination.next({
          currentPage: pager.currentPage,
          limit: 20,
          totalPage: pager.pages,
        });
      });
  }

  getDetailProduct(id: number | string) {
    return this.api.get(`products/${id}`).pipe(
      map((product) => {
        return {
          ...product.body.data,
          id: product.body.data.id,
        };
      })
    );
  }

  getCategory() {
    return this.api.get('home/categories').pipe(
      map((cate) => {
        return cate.body.data;
      })
    );
  }
}
