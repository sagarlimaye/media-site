import { Component, OnInit } from '@angular/core';
import { AddNews }    from '../addNews';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  NewsTitle: string;
  Description: string;
  Url: string;
  UrlImg: string;   
  Published: string;
  submitted = false;

  onSubmit() { this.submitted = true; }

  resetNews()
  {

  }

  editField: string;
    newsList: Array<any> = [
      { title:'The War On Waste', 
        desc:'Secretary of Defense Donald Rumsfeld declared war. Not on foreign terrorists, the adversarys closer to home. Its the Pentagon bureaucracy. He said money wasted by the military poses a serious threat. Rumsfeld promised change but the next day–Sept. 11–the world changed and in the rush to fund the war on terrorism, the war on waste seems to have been forgotten.', 
        publish:'14th jan 2020'},
      { title:'The War On Waste', 
        desc:'Secretary of Defense Donald Rumsfeld declared war. Not on foreign terrorists, the adversarys closer to home. Its the Pentagon bureaucracy. He said money wasted by the military poses a serious threat. Rumsfeld promised change but the next day–Sept. 11–the world changed and in the rush to fund the war on terrorism, the war on waste seems to have been forgotten.', 
        publish:'14th jan 2020'},
      { title:'The War On Waste', 
        desc:'Secretary of Defense Donald Rumsfeld declared war. Not on foreign terrorists, the adversarys closer to home. Its the Pentagon bureaucracy. He said money wasted by the military poses a serious threat. Rumsfeld promised change but the next day–Sept. 11–the world changed and in the rush to fund the war on terrorism, the war on waste seems to have been forgotten.', 
        publish:'14th jan 2020'},
      { title:'The War On Waste', 
        desc:'Secretary of Defense Donald Rumsfeld declared war. Not on foreign terrorists, the adversarys closer to home. Its the Pentagon bureaucracy. He said money wasted by the military poses a serious threat. Rumsfeld promised change but the next day–Sept. 11–the world changed and in the rush to fund the war on terrorism, the war on waste seems to have been forgotten.', 
        publish:'14th jan 2020'},
      { title:'The War On Waste', 
        desc:'Secretary of Defense Donald Rumsfeld declared war. Not on foreign terrorists, the adversarys closer to home. Its the Pentagon bureaucracy. He said money wasted by the military poses a serious threat. Rumsfeld promised change but the next day–Sept. 11–the world changed and in the rush to fund the war on terrorism, the war on waste seems to have been forgotten.', 
        publish:'14th jan 2020'},
      
    ];

    awaitingnewsList: Array<any> = [
      { title:'The War On Waste', 
      desc:'Secretary of Defense Donald Rumsfeld declared war. Not on foreign terrorists, the adversarys closer to home. Its the Pentagon bureaucracy. He said money wasted by the military poses a serious threat. Rumsfeld promised change but the next day–Sept. 11–the world changed and in the rush to fund the war on terrorism, the war on waste seems to have been forgotten.', 
      publish:'14th jan 2020'},
    ];

    updateList(id: number, property: string, event: any) {
      const editField = event.target.textContent;
      this.newsList[id][property] = editField;
    }

    remove(id: any) {
      this.awaitingnewsList.push(this.newsList[id]);
      this.newsList.splice(id, 1);
    }

    add() {
      if (this.awaitingnewsList.length > 0) {
        const news = this.awaitingnewsList[0];
        this.newsList.push(news);
        this.awaitingnewsList.splice(0, 1);
      }
    }

    changeValue(id: number, property: string, event: any) {
      this.editField = event.target.textContent;
    }
}
