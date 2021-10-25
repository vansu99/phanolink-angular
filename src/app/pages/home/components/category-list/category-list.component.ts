import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@pages/products/products.service';

@Component({
  selector: 'phanolink-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  categories: any[] = [];
  constructor(private readonly product: ProductsService) {}

  ngOnInit(): void {
    this.loadCategory();
  }

  loadCategory() {
    this.product.getCategory().subscribe((data) => {
      this.categories = [...data];
    });
  }
}
