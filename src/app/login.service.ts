import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  redirectUrl = "/";
  tokenSubject : BehaviorSubject<string> = new BehaviorSubject<string>(localStorage.getItem('token'));
  constructor(private http: HttpClient) { }

  auth(username, password) {
    return this.http.post('/api/auth', { username: username, password: password }).pipe(
      tap(t => {
        localStorage.setItem('token', t.toString());
        this.tokenSubject.next(localStorage.getItem('token'));
      })
    );
  }
  logout() {
    localStorage.removeItem('token');
    this.tokenSubject.next(localStorage.getItem('token'));
  }
}
