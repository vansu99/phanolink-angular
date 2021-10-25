import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@pages/products/products.service';
import { PaginationState } from '@shared/components/phanolink-paginator/paginator.model';
import { PaginatorService } from '@shared/components/phanolink-paginator/paginator.service';

@Component({
  selector: 'phanolink-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  productList!: any[];
  productLength = 0;
  paginator!: PaginationState;
  searchTerm: string = '';
  isLoading: boolean = false;
  skeletonList: any[] = Array.from(new Array(20));

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productService: ProductsService,
    private readonly paginatorService: PaginatorService
  ) {
    this.productService.isLoading$.subscribe((res) => {
      this.isLoading = res;
    });
    this.loadProducts();

    if (this.route.snapshot.params?.categoryId) {
      this.loadProductByCateId();
    } else {
      this.loadAllProduct();
    }

    this.paginatorService.pagination$.subscribe((response) => {
      this.paginator = { ...response };
    });
  }

  loadProducts() {
    this.productService.product$.subscribe((product) => {
      if (product.message) {
        this.productList = [];
        this.productLength = 0;
      } else {
        this.productList = product;
        this.productLength = product.length;
      }
    });
  }

  loadProductByCateId() {
    let params = this.route.params;
    let queryParams = this.route.queryParams;
    combineLatest([params, queryParams])
      .pipe(map(([params, queryParams]) => ({ ...params, ...queryParams })))
      .subscribe((res) => {
        if (res.categoryId) {
          const queryParamState = {
            page: res.page,
            sort: res.sort,
            q: res.q,
          };
          this.productService.getProductByCategoryId(res.categoryId, queryParamState);
        }
      });
  }

  loadAllProduct() {
    this.route.queryParams.subscribe((res) => {
      if (res.q) {
        this.searchTerm = res.q;
      }
      this.paginatorService.currentPage.next(Number.parseInt(res.page) || 1);

      let queryParamState = {
        page: Number.parseInt(res.page) || 1,
        sort: res.sort,
        q: res.q,
      };
      this.productService.getProducts(queryParamState);
    });
  }
}
