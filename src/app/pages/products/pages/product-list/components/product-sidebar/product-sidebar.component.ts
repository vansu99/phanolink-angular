import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'phanolink-product-sidebar',
  templateUrl: './product-sidebar.component.html',
  styleUrls: ['./product-sidebar.component.scss'],
})
export class ProductSidebarComponent implements OnInit {
  categories: any[] = [];
  constructor(private readonly activated: ActivatedRoute, private readonly router: Router) {}

  ngOnInit(): void {
    this.loadCategory();
  }

  loadCategory() {
    this.activated.data.subscribe((data) => {
      this.categories = data.cate.category;
    });
  }

  isLinkActive(url: string, id: number | string): boolean {
    const queryParamsIndex = this.router.url.indexOf('?');
    const baseUrl =
      queryParamsIndex === -1 ? this.router.url : this.router.url.slice(0, queryParamsIndex);
    return baseUrl === url + `/${id}`;
  }
}
