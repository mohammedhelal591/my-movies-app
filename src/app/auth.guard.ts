import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { take, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _AuthService: AuthService, private _Router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    // Check if user data is already available (e.g., after login or successful refresh)
    if (this._AuthService.currentUserData.getValue() !== null) {
      return of(true);
    }

    // If no user data, but there's a refresh token, try to refresh the session
    if (this._AuthService.getRefreshToken()) {
      return this._AuthService.refreshAccessToken().pipe(
        map(() => {
          // If refresh successful, the currentUserData is updated in AuthService.
          // Now check if currentUserData is set.
          if (this._AuthService.currentUserData.getValue() !== null) {
            return true;
          } else {
            // Even after refresh, if currentUserData is null (e.g., token invalid)
            this._AuthService.logout();
            return this._Router.createUrlTree(['/login']);
          }
        }),
        catchError(() => {
          // If refreshAccessToken fails (e.g., refresh token expired)
          this._AuthService.logout(); // Logout will navigate to /login
          return of(this._Router.createUrlTree(['/login']));
        })
      );
    } else {
      // No current user data and no refresh token, so redirect to login
      this._AuthService.logout(); // Ensure tokens are cleared, though they should be
      return of(this._Router.createUrlTree(['/login']));
    }
  }
}
