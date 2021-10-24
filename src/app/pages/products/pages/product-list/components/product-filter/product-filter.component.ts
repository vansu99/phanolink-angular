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
  isActive = '';

  constructor(private readonly route: ActivatedRoute, private readonly router: Router) {
    this.isActive = this.route.snapshot.queryParams.sort;
  }

  sortProduct(obj: any) {
    this.isActive = obj.sort;
    const categoryId = this.route.snapshot.params.categoryId;
    const queryParam = { ...this.route.snapshot.queryParams, ...obj };
    if (categoryId) {
      this.router.navigate(['/products', categoryId], { queryParams: queryParam });
    } else {
      this.router.navigate(['/products'], { queryParams: queryParam });
    }
  }
}
