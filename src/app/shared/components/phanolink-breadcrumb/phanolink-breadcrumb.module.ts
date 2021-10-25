import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhanolinkBreadcrumbComponent } from './phanolink-breadcrumb.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PhanolinkBreadcrumbComponent],
  imports: [CommonModule, RouterModule],
  exports: [PhanolinkBreadcrumbComponent],
})
export class PhanolinkBreadcrumbModule {}
