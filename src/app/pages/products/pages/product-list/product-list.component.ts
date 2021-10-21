import { Component } from '@angular/core';
import { PaginationState } from '@shared/components/phanolink-paginator/paginator.model';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@pages/products/products.service';
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
    this.handleQueryParams();
    this.paginatorService.pagination$.subscribe((response) => {
      this.paginator = { ...response };
    });
  }

  loadProducts() {
    this.productService.product$.subscribe((product) => {
      this.productList = product;
      this.productLength = product.length;
    });
  }

  handleQueryParams() {
    this.route.queryParams.subscribe((res) => {
      if (res.q) {
        this.searchTerm = res.q;
      }
      this.paginatorService.currentPage.next(Number.parseInt(res._page) || 1);

      let queryParamState = {
        _page: Number.parseInt(res._page),
        _limit: 20,
        _sort: res._sort,
        _order: res._order,
        q: res.q,
        categoryId: res.categoryId,
      };
      this.productService.getProducts(queryParamState);
    });
  }
}
