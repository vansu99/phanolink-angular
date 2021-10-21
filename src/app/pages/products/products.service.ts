import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as queryString from 'query-string';
import { PaginatorService } from '@shared/components/phanolink-paginator/paginator.service';
import { ApiService } from '../../cores/services/api.service';
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
      .get(`products?${queryParams}`)
      .pipe(
        map(({ body }) => {
          return {
            //pages: Math.ceil(body.pagination._totalRows / obj._limit),
            totalItems: body.pagination._totalRows,
            product: body.data,
          };
        }),
        finalize(() => this.isLoadingSubject.next(false))
      )
      .subscribe(({ totalItems, product }) => {
        this.productSubject.next(product);
        const pager = this.paginator.getPager(totalItems, obj._page);
        this.paginator.pagination.next({
          currentPage: pager.currentPage,
          limit: obj._limit,
          totalPage: pager.pages,
        });
      });
  }

  getDetailProduct(id: number | string | null) {
    return this.api.get(`products/${id}`).pipe(
      map((product) => {
        return {
          ...product.body,
          id: product.body.id.slice(0, 8),
        };
      })
    );
  }

  getCategory() {
    return this.api.get('categories').pipe(
      map((cate) => {
        return cate.body;
      })
    );
  }
}
