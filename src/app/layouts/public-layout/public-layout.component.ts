import { Component, OnInit } from '@angular/core';
import { AuthService } from '@features/auth/auth.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'phanolink-public-layout',
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.scss'],
})
export class PublicLayoutComponent implements OnInit {
  constructor(private readonly auth: AuthService) {}

  ngOnInit(): void {
    this.checkAuthenticated();
  }

  checkAuthenticated() {
    this.auth.setAuthenticated(this.auth.isAuthenticate());
    // token is exist -> set currentUser
    this.auth.isAuthenticated$
      .pipe(
        switchMap((isAuthenticated) => {
          if (isAuthenticated) {
            return this.auth.getUser();
          }
          return of(null);
        })
      )
      .subscribe((user: any) => {
        this.auth.setUser(user?.data);
      });
  }
}
