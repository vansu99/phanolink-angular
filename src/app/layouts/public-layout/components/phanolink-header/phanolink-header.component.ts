import { Component, OnInit, HostListener } from '@angular/core';
import {
  slideInLeftOnEnterAnimation,
  slideInUpOnEnterAnimation,
  slideOutLeftOnLeaveAnimation,
} from 'angular-animations';
import { FormControl } from '@angular/forms';

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

  constructor() {}

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

  handleSearchProduct() {}

  openModalRegister() {}

  openModalLogin() {}

  logOut() {}
}
