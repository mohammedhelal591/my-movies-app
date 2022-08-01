import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {


  
  constructor(private _HttpClient:HttpClient, private _Router:Router) {}
  
  currentUserData:any = new BehaviorSubject(null);

  register(formdata:any):Observable<any>{
    return this._HttpClient.post(`https://routeegypt.herokuapp.com/signup`, formdata);
  };


  login(formdata:any):Observable<any>{
    return this._HttpClient.post(`https://routeegypt.herokuapp.com/signin`, formdata);
  };

  logout(){
    localStorage.removeItem('currentUser');
    this._Router.navigate(['/login']);
  };

  saveCurrentUserData() {
    let token:any = localStorage.getItem("currentUser");
    let decodedToken = jwtDecode(token);
    this.currentUserData.next(decodedToken);
  }

}
