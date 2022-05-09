import { LoginReq } from './../../../../shared/models/LoginReq';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthRes } from 'src/app/shared/models/AuthRes';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  hide: boolean = true;
  submitted: boolean = false;
  err_msg: string | null = null;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.submitted = true;
    this.err_msg = null;
    var loginReq: LoginReq = this.loginForm.value;

    this.authService.login(loginReq).subscribe({
      next: (authRes: AuthRes) => {
        localStorage.setItem('auth_token', authRes.token);
        localStorage.setItem('user', JSON.stringify(authRes));
        this.submitted = false;
        this.router.navigate(['/messages']);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.err_msg = error.error;
        this.submitted = false;
      },
    });
  }

  goToSignUp() {
    this.router.navigate(['/auth/register']);
  }
  getErrorMessage() {
    this.loginForm.controls['email'];
    if (this.loginForm.controls['email'].hasError('required')) {
      return 'You must enter an email';
    }

    return this.loginForm.controls['email'].hasError('email')
      ? 'Not a valid email'
      : '';
  }
}
