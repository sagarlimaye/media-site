import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service'
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDetailService } from 'src/app/services/user-detail.service';

declare var M: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private userDetailService: UserDetailService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshUserList();
  }

  resetForm(form?: NgForm){
    if (form){
      form.reset();
    }
    this.userService.selectedUser = {
      _id: "",
      title: "",
      description: "",
      publishedAt: null
    }
  }

  onSubmit(form : NgForm){
    if(form.value._id === ""){
      this.userService.postUser(form.value).subscribe((res) =>{
        this.resetForm(form);
        this.refreshUserList();
        M.toast({ html: 'Saved successfully', classes: 'rounded'});
      })
    }
    else{
      this.userService.putUser(form.value).subscribe((res) =>{
        this.resetForm(form);
        this.refreshUserList();
        M.toast({ html: 'Saved successfully', classes: 'rounded'});
      })
    }
    
  }
  refreshUserList(){
    this.userService.getUserList().subscribe((res)=>{
      this.userService.users = res as User[];
    })
  }
  onEdit(user: User){
    this.userService.selectedUser = user;
  }
  onDelete(_id: string, form: NgForm){
    if(confirm('Are you sure you want to delete this record?') == true){
      this.userService.deleteUser(_id).subscribe((res) =>{
        this.refreshUserList();
        this.resetForm(form);
      })
    }
  }
  onLogout(){
    this.userDetailService.deleteToken();
    this.router.navigate(['/login']);
  }
}
