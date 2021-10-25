import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AuthService } from '@features/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private readonly router: Router, private readonly auth: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuthenticate();
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuthenticate();
  }

  private isAuthenticate() {
    return of(this.auth.isAuthenticate()).pipe(
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          // not loggedIn -> redirect home page
          this.router.navigate(['']);
        } else if (!isAuthenticated && this.router.config[0].path === 'admin') {
          this.router.navigate(['/admin/login']);
        }
      })
    );
  }
}
