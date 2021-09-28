import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';


@NgModule({
  declarations: [
    PublicLayoutComponent,
    AdminLayoutComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LayoutsModule { }
