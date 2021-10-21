import { Component, OnInit, HostListener } from '@angular/core';
import {
  slideInLeftOnEnterAnimation,
  slideInUpOnEnterAnimation,
  slideOutLeftOnLeaveAnimation,
} from 'angular-animations';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

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
  query = new FormControl('');
  fixed = false;
  isMenuMobile = false;

  constructor(private readonly route: ActivatedRoute, private readonly router: Router) {}

  ngOnInit(): void {
    return;
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
        this.router.navigate(['/products', this.route.snapshot.queryParams.categoryId], {
          queryParams: { ...this.route.snapshot.queryParams, q: query },
        });
      });
  }

  openModalRegister() {}

  openModalLogin() {}

  logOut() {}
}
