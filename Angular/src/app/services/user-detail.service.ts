import { Injectable } from '@angular/core';
import { UserDetail } from 'src/app/models/user-detail';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {
  selectedUserDetail: UserDetail = {
    userName: '',
    email: '',
    password: '',
    phone: null
  }
  //noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  readonly url = 'http://localhost:5342/api';

  constructor(private http: HttpClient) { }

  postUserDetail(userDetail: UserDetail){
    return this.http.post(this.url+'/register', userDetail);
  }
  login(authCredentials){
    return this.http.post(this.url+'/authenticate', authCredentials);
  }
  getUserProfile() {
    return this.http.get(this.url + '/userprofile');
  }

  setToken(token: string){
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  deleteToken(){
    localStorage.removeItem('token');
  }
  getUserPayload() {
    var token = localStorage.getItem('token');
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
