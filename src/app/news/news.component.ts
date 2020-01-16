import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { Observable } from 'rxjs';
import { stringify } from 'querystring';
// import { newsSchema } from '../../../schemas.'

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  news$ : Observable<any>;
  receivednews= [];
  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.news$ = this.newsService.getNews();
    var i;
    this.news$.forEach(element => {
      for(i in element){
        var item = {}
        item['title'] = element[i].title;
        item['story'] = element[i].story;
        item['description'] = element[i].description;
        item['type'] = element[i].type;
        item['imageUrl'] = element[i].imageUrl;
        //console.log(item);
        this.receivednews.push(item);
        //console.log(this.receivednews);
      }
    });
    
  }

}
