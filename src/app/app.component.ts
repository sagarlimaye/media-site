import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Media Site';
  showLogout: boolean;
  tokenSubscription : Subscription;
  constructor(private loginService: LoginService, private router: Router) {
    
  }
  ngOnInit() {
    this.tokenSubscription = this.loginService.tokenSubject.subscribe((token) => {
      if(token) this.showLogout = true;
      else this.showLogout = false;
    });
  }
  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
  ngOnDestroy() {
    this.tokenSubscription.unsubscribe();
  }
}
