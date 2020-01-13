import { Component, OnInit } from '@angular/core';
import { UserDetailService } from 'src/app/services/user-detail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetail;
  constructor(private userDetailService: UserDetailService, private router: Router) { }

  ngOnInit() {
    this.userDetailService.getUserProfile().subscribe(
      res => {
        this.userDetail = res ['userDetail'];
      },
      err => {

      }
    )
  }
  onLogout(){
    this.userDetailService.deleteToken();
    this.router.navigate(['/login']);
  }

}
