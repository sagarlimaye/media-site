import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { LoginService } from '../login.service';
import { User } from '../user';
import { map, tap } from 'rxjs/operators';

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
    return this.loginService.tokenSubject.pipe(map(token => this.checkLogin(this.url, token)));
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }
  checkLogin(url: string, token: string) {
    if(!token) {
      this.loginService.redirectUrl = url;
      
      this.router.navigate(['/login']);
      return false;
    }
    else return true;
  }
  
}
