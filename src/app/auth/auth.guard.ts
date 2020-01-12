import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { LoginService } from '../login.service';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  url :string;

  constructor(private loginService : LoginService, private router : Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin(state.url);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  checkLogin(url: string) {
    if(localStorage.getItem('_id') === null) {
      console.log('hey');
      this.loginService.redirectUrl = url;
      
      this.router.navigate(['/login']);
      return false;
    }
    else return true;
  }
  
}
