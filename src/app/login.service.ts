import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  redirectUrl: string;
  constructor(private http: HttpClient) { }

  auth(username, password) {
    return this.http.post('/api/auth', { username: username, password: password });
  }
}
