import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { User } from '../user';
import { LoginService } from '../login.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  username: string;
  password: string;
  loginSubscription : Subscription;
  constructor(private loginService: LoginService, private router : Router) { }

  ngOnInit() {
  }

  authenticate() {
    this.loginSubscription = this.loginService.auth(this.username, this.password).subscribe((data) => {
      this.router.navigate([this.loginService.redirectUrl]);
    });
  }
  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }
}
