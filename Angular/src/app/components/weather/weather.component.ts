import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDetailService } from 'src/app/services/user-detail.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  constructor(private router: Router, private userDetailService: UserDetailService) { }

  ngOnInit() {
  }
  onLogout(){
    this.userDetailService.deleteToken();
    this.router.navigate(['/login']);
  }
  onSubmit(form: NgForm){
    const searchLocation = document.querySelector('input').value
    console.log('yooooo')
    document.querySelector('#message2').textContent = ''
    fetch(`http://localhost:5342/weather?address=${searchLocation}`).then((response) => {
      console.log(response)
        response.json().then((data) => {
            if (data.error) {
                document.querySelector('#message1').textContent = data.error
            } else {
                document.querySelector('#message1').textContent = data.location
                document.querySelector('#message2').textContent = data.forecast
            }
        })
    })
  }
}
