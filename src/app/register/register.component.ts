import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string;
  password: string;
  error: boolean = false;
  success: boolean = false;
  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }
  register() {
    this.loginService.registerUser(this.username, this.password).subscribe({
      next: (data) => { 
        this.success = true;
        console.log('success!');
      }, 
      error: (err) => { this.error = true; console.log('error :(', err); }
    });
  }

}
