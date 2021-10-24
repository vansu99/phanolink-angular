import { Component, OnInit, HostListener } from '@angular/core';
import {
  slideInLeftOnEnterAnimation,
  slideInUpOnEnterAnimation,
  slideOutLeftOnLeaveAnimation,
} from 'angular-animations';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@features/auth/auth.service';
import { UserState } from '@features/auth/auth.model';
import { DialogFormComponent } from '@layouts/public-layout/components/phanolink-header/modals/dialog-form/dialog-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'phanolink-header',
  templateUrl: './phanolink-header.component.html',
  styleUrls: ['./phanolink-header.component.scss'],
  animations: [
    slideInUpOnEnterAnimation(),
    slideInLeftOnEnterAnimation({ duration: 500 }),
    slideOutLeftOnLeaveAnimation({ duration: 400 }),
  ],
})
export class PhanolinkHeaderComponent implements OnInit {
  fixed = false;
  user!: UserState;
  isMenuMobile = false;
  isLoggedIn!: Observable<boolean>;
  query = new FormControl('');

  constructor(
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly auth: AuthService,
    private readonly route: ActivatedRoute
  ) {
    this.isLoggedIn = this.auth.isAuthenticated$;
  }

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    this.auth.currentUser.subscribe((user) => {
      this.user = user;
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.fixed = window.pageYOffset > 90;
  }

  showMenuMobile() {
    this.isMenuMobile = true;
  }

  hideMenuMobile() {
    this.isMenuMobile = false;
  }

  handleSearchProduct() {
    of(this.query.value)
      .pipe(distinctUntilChanged(), debounceTime(600))
      .subscribe((query) => {
        const queryParams = { ...this.route.snapshot.queryParams, q: query };
        this.router.navigate(['/products'], {
          queryParams,
        });
      });
  }

  openModalRegister() {}

  openModalLogin() {
    this.dialog.open(DialogFormComponent, {
      width: '470px',
      panelClass: 'custom-dialog-form',
      data: {
        isLoginActive: true,
      },
    });
    this.isMenuMobile = false;
  }

  logOut() {
    this.auth.logout();
    this.dialog.closeAll();
  }
}
