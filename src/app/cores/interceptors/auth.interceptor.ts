import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@features/auth/auth.service';
import { STORAGE_KEYS, StorageService } from '../services/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly auth: AuthService, private readonly storage: StorageService) {}

  private static addToken(req: HttpRequest<unknown>, token: unknown) {
    return req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.storage.get(STORAGE_KEYS.TOKEN);
    if (token) {
      const cloned = AuthInterceptor.addToken(request, token);
      return next.handle(cloned);
    } else {
      return next.handle(request);
    }
  }
}
