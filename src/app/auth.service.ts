import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { tap, catchError, filter, take, switchMap } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  backendUrl = 'https://auth-backend-production-9591.up.railway.app/api';

  constructor(private _HttpClient: HttpClient, private _Router: Router) {}

  currentUserData: any = new BehaviorSubject(null);
  private isRefreshingTokenSubject = new BehaviorSubject<boolean>(false);
  isRefreshingToken$ = this.isRefreshingTokenSubject.asObservable(); // Public observable

  // New public methods to interact with the private subject
  getIsRefreshingToken(): boolean {
    return this.isRefreshingTokenSubject.getValue();
  }

  setIsRefreshingToken(value: boolean): void {
    this.isRefreshingTokenSubject.next(value);
  }

  // New methods for token management
  private saveTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  removeTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  register(formdata: any): Observable<any> {
    return this._HttpClient.post(`${this.backendUrl}/auth/register`, formdata);
  }

  login(formdata: any): Observable<any> {
    return this._HttpClient
      .post(`${this.backendUrl}/auth/login`, formdata)
      .pipe(
        tap((response: any) => {
          if (
            response.success &&
            response.data.accessToken &&
            response.data.refreshToken
          ) {
            this.saveTokens(
              response.data.accessToken,
              response.data.refreshToken
            );
            this.saveCurrentUserData();
          }
        })
      );
  }

  logout() {
    this.removeTokens();
    this.currentUserData.next(null);
    this._Router.navigate(['/login']);
  }

  // New method to refresh access token
  refreshAccessToken(): Observable<any> {
    // Prevent multiple concurrent refreshes
    if (this.getIsRefreshingToken()) { // Use the public getter
      // If already refreshing, return an observable that completes when it's done
      return this.isRefreshingToken$.pipe(
        filter(isRefreshing => !isRefreshing),
        take(1),
        switchMap(() => {
          // Once refreshing is done, re-check current tokens or user data if needed
          return of({ success: true, data: { accessToken: this.getAccessToken(), refreshToken: this.getRefreshToken() } });
        })
      );
    }

    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.logout();
      return throwError('No refresh token available');
    }

    this.setIsRefreshingToken(true); // Use the public setter

    return this._HttpClient.post(`${this.backendUrl}/auth/refresh`, { refreshToken }).pipe(
      tap((response: any) => {
        if (response.success && response.data.accessToken && response.data.refreshToken) {
          this.saveTokens(response.data.accessToken, response.data.refreshToken);
          this.saveCurrentUserData();
        } else {
          this.logout();
          throw new Error('Access token refresh failed or invalid response from backend.');
        }
        this.setIsRefreshingToken(false); // Use the public setter
      }),
      catchError((err) => {
        console.error('Error during refreshAccessToken:', err);
        this.setIsRefreshingToken(false); // Use the public setter
        this.logout();
        return throwError(err);
      })
    );
  }

  saveCurrentUserData() {
    let token: any = this.getAccessToken(); // Gets the *current* accessToken from localStorage
    if (token) {
      try {
        let decodedToken = jwtDecode(token);
        console.log('decodedToken : ', decodedToken);
        this.currentUserData.next(decodedToken);
      } catch (e) {
        console.error('Error decoding access token:', e);
        this.currentUserData.next(null); // Clear user data if token is malformed
        this.logout(); // Logout if the access token is malformed
      }
    } else {
      this.currentUserData.next(null); // No access token, so no user data
    }
  }
}
