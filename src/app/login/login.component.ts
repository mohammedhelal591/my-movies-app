import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  error: string = '';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        '^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:\'",.<>/?|\\\\]{8,12}$'
      ),
    ]),
  });

  submitForm(loginForm: FormGroup) {
    if (loginForm.valid) {
      this._AuthService.login(loginForm.value).subscribe({
        next: (response) => {
          localStorage.setItem('currentUser', response.data.accessToken);
          this._AuthService.saveCurrentUserData();
          this._Router.navigate(['/home']);
        },
        error: (error) => {
          console.log('error : ', error);
        },
      });
    }
  }

  ngOnInit(): void {}
}
