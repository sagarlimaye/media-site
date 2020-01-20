import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from './weather.service';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Media Site';
  token$: Observable<any>
  faCloud;
  weather$: Observable<any>

  constructor(private loginService: LoginService, private router: Router, private weatherService: WeatherService) {
    
  }
  ngOnInit() {
    this.token$ = this.loginService.tokenSubject.pipe(tap((token) => {
      this.weather$ = this.weatherService.getWeather('London,uk', 'b6907d289e10d714a6e88b30761fae22');
    },
    (err) => {
      this.weather$ = null;
    }));
    this.faCloud = faCloud;
  }
  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
  }
}
