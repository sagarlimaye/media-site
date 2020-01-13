import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from './weather.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Media Site';
  showLogout: boolean;
  tokenSubscription : Subscription;
  faCloud;
  weather$: Observable<any>
  constructor(private loginService: LoginService, private router: Router, private weatherService: WeatherService) {
    
  }
  ngOnInit() {
    this.tokenSubscription = this.loginService.tokenSubject.subscribe((token) => {
      if(token)  {
        this.showLogout = true;
        this.weather$ = this.weatherService.getWeather('London,uk', 'b6907d289e10d714a6e88b30761fae22');
      }
      else {
        this.showLogout = false;
        this.weather$ = null;
      } 
    });
    this.faCloud = faCloud;
  }
  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
  ngOnDestroy() {
    this.tokenSubscription.unsubscribe();
  }
}
