import { Component } from '@angular/core';
import { AuthService } from '@features/auth/auth.service';

@Component({
  selector: 'phanolink-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
})
export class AdminHeaderComponent {
  constructor(private readonly auth: AuthService) {}

  handleLogout() {
    this.auth.logout();
  }
}
