import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { publicRoutes } from '@layouts/public-layout/public-layout.routes';
import { PhanolinkHeaderComponent } from '@layouts/public-layout/components/phanolink-header/phanolink-header.component';
import { PhanolinkFooterComponent } from '@layouts/public-layout/components/phanolink-footer/phanolink-footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PublicLayoutComponent } from '@layouts/public-layout/public-layout.component';

@NgModule({
  declarations: [PhanolinkHeaderComponent, PhanolinkFooterComponent, PublicLayoutComponent],
  imports: [CommonModule, RouterModule.forChild(publicRoutes), ReactiveFormsModule],
  exports: [PhanolinkFooterComponent, PhanolinkHeaderComponent],
})
export class PublicLayoutModule {}
