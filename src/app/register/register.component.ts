import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  error: string = '';

  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(12),
    ]),
    lastName: new FormControl(null, [
      Validators.required,
      Validators.min(3),
      Validators.max(12),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        '^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{};:\'",.<>/?|\\\\]{8,12}$'
      ),
    ]),
  });

  submitForm(registerForm: FormGroup) {
    if (registerForm.valid) {
      this._AuthService.register(registerForm.value).subscribe({
        next: (apiResponse) => {
          this._Router.navigate(['/login']);
        },
        error: (error) => {
          console.log('api error : ', error);
        },
      });
    }
  }

  ngOnInit(): void {}
}
