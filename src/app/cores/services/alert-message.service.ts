import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AlertMessageService {
  constructor(private readonly snackBar: MatSnackBar) {}

  config: MatSnackBarConfig = {
    duration: 1500,
    verticalPosition: 'top',
    horizontalPosition: 'right',
  };

  success(msg: string) {
    this.config['panelClass'] = ['notification', 'success'];
    this.snackBar.open(msg, '', this.config);
  }
}
