import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'phanolink-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent {
  @Input() query = '';
  @Input() productLength = 0;

  constructor(private readonly route: ActivatedRoute, private readonly router: Router) {}

  sortProduct(obj: any) {
    const queryParam = { ...this.route.snapshot.queryParams, ...obj };
    this.router.navigate(['/products', this.route.snapshot.params.categoryId], {
      queryParams: queryParam,
    });
  }
}
