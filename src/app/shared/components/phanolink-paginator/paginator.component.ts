import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'phanolink-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnChanges {
  @Input() current: number = 1;
  @Input() perPage!: number;
  @Input() totalPage!: number[];
  pages: number[] = [];

  constructor(private readonly route: ActivatedRoute, private readonly router: Router) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.totalPage?.currentValue) {
      this.pages = this.totalPage;
    }
  }

  getCurrentPage(): number {
    const currentPage = Math.ceil((this.perPage * this.current) / 20);
    return currentPage === 0 ? currentPage + 1 : currentPage;
  }

  // khi trigger vao tung page
  onChangePage(event: Event, path: string, page: number) {
    this.router.navigate([path, this.route.snapshot.params.categoryId], {
      relativeTo: this.route,
      queryParams: { _page: page },
      queryParamsHandling: 'merge',
    });
    event.preventDefault();
  }

  // trigger icon next
  gotoNextPage(event: Event, path: string) {
    const nextPage = this.getCurrentPage() + 1;
    this.router.navigate([path, this.route.snapshot.params.categoryId], {
      relativeTo: this.route,
      queryParams: { _page: nextPage },
      queryParamsHandling: 'merge',
    });
    event.preventDefault();
  }
}
