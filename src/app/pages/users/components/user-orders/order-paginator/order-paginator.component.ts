import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '@pages/users/users.service';

@Component({
  selector: 'phanolink-order-paginator',
  templateUrl: './order-paginator.component.html',
  styleUrls: ['./order-paginator.component.scss'],
})
export class OrderPaginatorComponent {
  pages: number[] = [];
  pagination = {
    totalPages: 1,
    currentPage: 1,
    perPage: 5,
  };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly users: UsersService
  ) {
    this.users.pagination$.subscribe((res) => {
      this.pagination = res;
      this.pages = Array.from(new Array(res?.totalPages)).map((_, i) => i + 1);
    });
  }

  getCurrentPage(): number {
    const currentPage = Math.ceil((this.pagination.perPage * this.pagination.currentPage) / 5);
    return currentPage === 0 ? currentPage + 1 : currentPage;
  }

  onChangePage(event: Event, page: number) {
    this.router.navigate(['/user/purchase'], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
    event.preventDefault();
  }

  // trigger icon next
  gotoNextPage(event: Event) {
    const nextPage = this.getCurrentPage() + 1;
    this.router.navigate(['/user/purchase'], {
      relativeTo: this.route,
      queryParams: { page: nextPage },
      queryParamsHandling: 'merge',
    });
    event.preventDefault();
  }
}
