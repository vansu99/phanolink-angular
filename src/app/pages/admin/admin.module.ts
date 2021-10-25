import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { adminPageRoutes } from '@pages/admin/admin.routes';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AdminFormComponent } from './components/admin-form/admin-form.component';
import { AdminTableComponent } from './components/admin-table/admin-table.component';
import { SharedModule } from '@shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ConfirmDialogModule } from '@shared/components/confirm-dialog/confirm-dialog.module';

@NgModule({
  declarations: [AdminComponent, AdminFormComponent, AdminTableComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    RouterModule.forChild(adminPageRoutes),
    SharedModule,
    MatCheckboxModule,
    ConfirmDialogModule,
  ],
})
export class AdminModule {}
