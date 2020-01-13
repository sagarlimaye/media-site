import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service'
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDetailService } from 'src/app/services/user-detail.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private userDetailService: UserDetailService) { }

  ngOnInit() {
    this.refreshUserList();
  }
  refreshUserList(){
    this.userService.getUserList().subscribe((res)=>{
      this.userService.users = res as User[];
    })
  }
  onLogout(){
    this.userDetailService.deleteToken();
    this.router.navigate(['/login']);
  }
  
}
