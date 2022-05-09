import { AuthRes } from './../../../shared/models/AuthRes';
import { LoginReq } from './../../../shared/models/LoginReq';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, Observable } from 'rxjs';
import { NewUserReq } from 'src/app/shared/models/NewUserReq';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  backend_url = environment.API_URL;
  login_url: string = '/api/auth/login';
  signUp_url: string = '/api/auth/register';
  constructor(private http: HttpClient) {}

  login(loginReq: LoginReq): Observable<AuthRes> {
    return this.http.post<AuthRes>(this.backend_url + this.login_url, loginReq);
  }
  signUp(newUserReq: NewUserReq): Observable<AuthRes> {
    return this.http.post<AuthRes>(
      this.backend_url + this.signUp_url,
      newUserReq
    );
  }
}
