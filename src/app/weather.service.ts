import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }
  getWeather(apiKey: string, location: string) {
    let params = new HttpParams();
    params = params.set('q', location);
    params = params.set('units', 'metric');
    params = params.set('appid', apiKey);
    return this.http.get("https://cors-anywhere.herokuapp.com/https://samples.openweathermap.org/data/2.5/find", { params: params });
  }
}
