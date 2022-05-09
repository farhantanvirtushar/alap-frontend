import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  backend_url = environment.API_URL;
  chats_url: string = '/api/message/all';
  signUp_url: string = '/api/auth/register';
  constructor(private http: HttpClient) {}

  getChats(): Observable<User[]> {
    return this.http.get<User[]>(this.backend_url + this.chats_url);
  }
}
