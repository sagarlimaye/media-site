import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from  'rxjs';

import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User;
  users: User[];
  readonly url = 'http://localhost:5342/user';

  constructor(private http : HttpClient) { }

  postUser(user: User){
    return this.http.post(this.url, user);
  }

  getUserList(){
    return this.http.get(this.url);
  }
  putUser(user: User){
    return this.http.put(this.url + `/${user._id}`, user);
  }
  deleteUser(_id: string){
    return this.http.delete(this.url + `/${_id}`)
  }
}
