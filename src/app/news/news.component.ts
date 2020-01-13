import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news$ : Observable<any>;
  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.news$ = this.newsService.getNews();
  }

}
