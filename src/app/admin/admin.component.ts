import { Component, OnInit } from '@angular/core';
import { AddNews }    from '../addNews';
import {HttpClient} from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  tokenSubject : BehaviorSubject<string> = new BehaviorSubject<string>(localStorage.getItem('token'));
  constructor(private http : HttpClient, private router: Router) { }

  ngOnInit() {
  }

    title: string;
    description: string;
    story: string;
    type: number;
    imageUrl: string;

addNews(){
  console.log("in add news");
  // return this.http.post('/api/addnews',{title : this.title, story : this.story, description : this.description , imageUrl : this.imageUrl, type : this.type});
  console.log(this.imageUrl);
    return this.http.post('http://localhost:3000/api/addnews', { title : this.title, story : this.story, description : this.description , imageUrl : this.imageUrl, type : this.type}).subscribe(news => {
    this.router.navigate(['/admin']);
  });
  //   tap(t => {
  //     localStorage.setItem('token', t.toString());
  //     this.tokenSubject.next(localStorage.getItem('token'));
  //   })
  // );
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
