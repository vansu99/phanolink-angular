import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Data, NavigationEnd, Router } from '@angular/router';
import { BreadcrumbState } from '@shared/components/phanolink-breadcrumb/breadcrumb.model';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private breadcrumbSubject = new BehaviorSubject<BreadcrumbState[]>([]);
  breadcrumb$ = this.breadcrumbSubject.asObservable();

  constructor(private readonly router: Router) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      const root = this.router.routerState.snapshot.root;
      const breadcrumbs: BreadcrumbState[] = [];
      this.addBreadcrumb(root, [], breadcrumbs);
      this.breadcrumbSubject.next(breadcrumbs);
    });
  }

  private addBreadcrumb(
    route: ActivatedRouteSnapshot | null,
    parentUrl: string[],
    breadcrumbs: BreadcrumbState[]
  ) {
    if (route) {
      const curUrl = parentUrl.concat(route.url.map((item) => item.path));

      if (route.data.breadcrumb) {
        // neu co route dau tien
        const breadcrumb = {
          label: BreadcrumbService.getLabel(route.data),
          url: '/' + curUrl.join('/'),
        };
        breadcrumbs.push(<BreadcrumbState>breadcrumb);
      }
      this.addBreadcrumb(route.firstChild, curUrl, breadcrumbs);
    }
  }

  private static getLabel(data: Data) {
    return typeof data.breadcrumb === 'function' ? data.breadcrumb(data) : data.breadcrumb;
  }
}
