import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { News } from './news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getNews() {
    return this.http.get('/api/news');
  }
  addNews(news: News) {
    return this.http.post('http://localhost:3000/api/addnews', news);
  }
}
