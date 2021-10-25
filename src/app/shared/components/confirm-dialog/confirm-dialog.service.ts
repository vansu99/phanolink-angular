import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  constructor(private readonly dialog: MatDialog) {}

  openConfirmDialog(msg: string) {
    return this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      disableClose: true,
      panelClass: 'confirm-dialog-container',
      data: {
        message: msg,
      },
    });
  }
}
