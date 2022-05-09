import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRes } from 'src/app/shared/models/AuthRes';
import { NewUserReq } from 'src/app/shared/models/NewUserReq';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  col_span: number = 0;
  hide: boolean = true;
  submitted: boolean = false;
  err_msg: string | null = null;

  registerForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    // re_password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.col_span = window.innerWidth <= 600 ? 2 : 1;
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.submitted = true;
    this.err_msg = null;
    var newUserReq: NewUserReq = this.registerForm.value;

    this.authService.signUp(newUserReq).subscribe({
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

  goToSignIn() {
    this.router.navigate(['/auth/login']);
  }
  getErrorMessage() {
    this.registerForm.controls['email'];
    if (this.registerForm.controls['email'].hasError('required')) {
      return 'You must enter an email';
    }

    return this.registerForm.controls['email'].hasError('email')
      ? 'Not a valid email'
      : '';
  }

  onResize(event: any) {
    this.col_span = window.innerWidth <= 600 ? 2 : 1;
  }
}
