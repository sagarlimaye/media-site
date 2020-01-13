import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDetailService } from 'src/app/services/user-detail.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userDetailService: UserDetailService, private router: Router){}  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (!this.userDetailService.isLoggedIn()){
        this.router.navigateByUrl('/login');
        this.userDetailService.deleteToken();
        return false;
      }
    return true;
  }
  
}
