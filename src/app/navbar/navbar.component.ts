import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // isLogin: boolean = false;
  isLogin:any = new BehaviorSubject(false);

  constructor(private _AuthService: AuthService) {

    _AuthService.currentUserData.subscribe(()=>{
      if(_AuthService.currentUserData.getValue() === null) {
        this.isLogin.next(false);
      }
      if(_AuthService.currentUserData.getValue() !== null) {
        this.isLogin.next(true);
      }
    })
  }

  logout(){
    this._AuthService.logout();
    this.isLogin.next(false);
  }

  ngOnInit(): void {
  }

}
