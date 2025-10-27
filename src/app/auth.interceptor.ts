import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // We'll rely on AuthService's isRefreshingToken$ now,
  // but keep a local subject for *this interceptor's* retry mechanism.
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public authService: AuthService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Only intercept requests going to your backend URL
    if (!request.url.includes(this.authService.backendUrl)) {
      return next.handle(request);
    }

    if (this.authService.getAccessToken()) {
      request = this.addToken(request, this.authService.getAccessToken()!);
    }

    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        }
        return throwError(error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.authService.getIsRefreshingToken()) { // Use the public getter
      this.authService.setIsRefreshingToken(true); // Use the public setter
      this.refreshTokenSubject.next(null); // Clear local subject to signal a new refresh attempt

      return this.authService.refreshAccessToken().pipe(
        switchMap((response: any) => {
          this.authService.setIsRefreshingToken(false); // Use the public setter
          this.refreshTokenSubject.next(response.data.accessToken); // Update local subject for waiting requests
          return next.handle(this.addToken(request, response.data.accessToken));
        }),
        catchError((err) => {
          this.authService.setIsRefreshingToken(false); // Use the public setter
          this.authService.logout();
          this.router.navigate(['/login']);
          return throwError(err);
        })
      );
    } else {
      // If a refresh is already in progress (either by AppComponent or another interceptor instance),
      // wait for it to complete and then retry the original request with the new token.
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        })
      );
    }
  }
}
