import { Component } from '@angular/core';
import { BreadcrumbState } from '@shared/components/phanolink-breadcrumb/breadcrumb.model';
import { Observable } from 'rxjs';
import { BreadcrumbService } from '@shared/components/phanolink-breadcrumb/breadcrumb.service';

@Component({
  selector: 'phanolink-breadcrumb',
  templateUrl: './phanolink-breadcrumb.component.html',
  styleUrls: ['./phanolink-breadcrumb.component.scss'],
})
export class PhanolinkBreadcrumbComponent {
  breadcrumb$!: Observable<BreadcrumbState[]>;

  constructor(private readonly breadcrumb: BreadcrumbService) {
    this.breadcrumb$ = this.breadcrumb.breadcrumb$;
  }
}
