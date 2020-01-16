import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  title: string;
  description: string;
  story: string;
  type: number;
  imageUrl: string;
  published: Date;

  constructor(private newsService: NewsService, private router: Router) { }

  ngOnInit() {
  }

addNews() {
  this.newsService.addNews({title: this.title, description: this.description, story: this.story, type: this.type, imageUrl: this.imageUrl, published: this.published}).subscribe(news => {
    this.router.navigate(['/']);
  });
  //   tap(t => {
  //     localStorage.setItem('token', t.toString());
  //     this.tokenSubject.next(localStorage.getItem('token'));
  //   })
  // );
}
  resetNews() {
    this.title = "";
    this.description = "";
    this.story = "";
    this.imageUrl = '';
    this.type = 1;
    this.published = new Date();
  }
  // onSubmit() { this.submitted = true; }

  // resetNews()
  // {

  // }

  // editField: string;
  //   newsList: Array<any> = [
  //     { title:'The War On Waste', 
  //       desc:'Secretary of Defense Donald Rumsfeld declared war. Not on foreign terrorists, the adversarys closer to home. Its the Pentagon bureaucracy. He said money wasted by the military poses a serious threat. Rumsfeld promised change but the next day–Sept. 11–the world changed and in the rush to fund the war on terrorism, the war on waste seems to have been forgotten.', 
  //       publish:'14th jan 2020'},
  //     { title:'The War On Waste', 
  //       desc:'Secretary of Defense Donald Rumsfeld declared war. Not on foreign terrorists, the adversarys closer to home. Its the Pentagon bureaucracy. He said money wasted by the military poses a serious threat. Rumsfeld promised change but the next day–Sept. 11–the world changed and in the rush to fund the war on terrorism, the war on waste seems to have been forgotten.', 
  //       publish:'14th jan 2020'},
  //     { title:'The War On Waste', 
  //       desc:'Secretary of Defense Donald Rumsfeld declared war. Not on foreign terrorists, the adversarys closer to home. Its the Pentagon bureaucracy. He said money wasted by the military poses a serious threat. Rumsfeld promised change but the next day–Sept. 11–the world changed and in the rush to fund the war on terrorism, the war on waste seems to have been forgotten.', 
  //       publish:'14th jan 2020'},
  //     { title:'The War On Waste', 
  //       desc:'Secretary of Defense Donald Rumsfeld declared war. Not on foreign terrorists, the adversarys closer to home. Its the Pentagon bureaucracy. He said money wasted by the military poses a serious threat. Rumsfeld promised change but the next day–Sept. 11–the world changed and in the rush to fund the war on terrorism, the war on waste seems to have been forgotten.', 
  //       publish:'14th jan 2020'},
  //     { title:'The War On Waste', 
  //       desc:'Secretary of Defense Donald Rumsfeld declared war. Not on foreign terrorists, the adversarys closer to home. Its the Pentagon bureaucracy. He said money wasted by the military poses a serious threat. Rumsfeld promised change but the next day–Sept. 11–the world changed and in the rush to fund the war on terrorism, the war on waste seems to have been forgotten.', 
  //       publish:'14th jan 2020'},
      
  //   ];

  //   awaitingnewsList: Array<any> = [
  //     { title:'The War On Waste', 
  //     desc:'Secretary of Defense Donald Rumsfeld declared war. Not on foreign terrorists, the adversarys closer to home. Its the Pentagon bureaucracy. He said money wasted by the military poses a serious threat. Rumsfeld promised change but the next day–Sept. 11–the world changed and in the rush to fund the war on terrorism, the war on waste seems to have been forgotten.', 
  //     publish:'14th jan 2020'},
  //   ];

  //   updateList(id: number, property: string, event: any) {
  //     const editField = event.target.textContent;
  //     this.newsList[id][property] = editField;
  //   }

  //   remove(id: any) {
  //     this.awaitingnewsList.push(this.newsList[id]);
  //     this.newsList.splice(id, 1);
  //   }

  //   add() {
  //     if (this.awaitingnewsList.length > 0) {
  //       const news = this.awaitingnewsList[0];
  //       this.newsList.push(news);
  //       this.awaitingnewsList.splice(0, 1);
  //     }
  //   }

  //   changeValue(id: number, property: string, event: any) {
  //     this.editField = event.target.textContent;
  //   }
}
