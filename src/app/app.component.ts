import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Movies App';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    console.log('start app : ', this.authService.getRefreshToken());
    if (this.authService.getRefreshToken()) {
      this.authService.refreshAccessToken().subscribe({
        next: () => {
          // IMPORTANT: this.authService.saveCurrentUserData() is called inside refreshAccessToken's tap.
          // Calling it here again is redundant but harmless if the tap worked.
          // The key is that currentUserData.next() was called with valid data.
          // No explicit navigation should happen here.
          console.log('Session refreshed successfully!');
        },
        error: (err) => {
          console.error('Session refresh failed during app init:', err);
          this.authService.logout(); // This is the redirect to login
        },
      });
    } else if (this.authService.getAccessToken()) {
      // If only accessToken exists (e.g., after initial login, but before refresh token is needed),
      // ensure currentUserData is set for UI.
      this.authService.saveCurrentUserData();
    }
  }
}
