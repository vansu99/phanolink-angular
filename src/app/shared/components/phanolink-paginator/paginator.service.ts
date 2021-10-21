import { Injectable } from '@angular/core';
import { PaginationState } from '@shared/components/phanolink-paginator/paginator.model';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginatorService {
  pagination = new ReplaySubject<PaginationState>(1);
  pagination$ = this.pagination.asObservable();
  currentPage = new ReplaySubject<number>(1);
  constructor() {}

  getPager(totalItems: number, current: number) {
    let totalPages = Math.ceil(totalItems / 20);

    if (current < 1) {
      current = 1;
    } else if (current > totalPages) {
      current = totalPages;
    }

    let startPage: number, endPage;
    if (totalPages <= 5) {
      // less than 5 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 5 total pages so calculate start and end pages
      if (current < 5) {
        startPage = 1;
        endPage = 5;
      } else if (current + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = current - 2;
        endPage = current + 2;
      }
    }
    let pages = Array.from(new Array(endPage + 1 - startPage).keys()).map((i) => startPage + i);
    return {
      pages,
      currentPage: current,
    };
  }
}
