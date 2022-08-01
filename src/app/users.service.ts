import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users:object[] = 
  [
    {name:'ahmed', age:35, gender:'male', salary:5000, dob:'14/06/1987'},
    {name:'amr', age:37, gender:'male', salary:7000, dob:'03/12/1985'},
    {name:'mohamed', age:30, gender:'male', salary:8000, dob:'27/11/1992'},
    {name:'abdelrahman', age:25, gender:'male', salary:5000, dob:'08/10/1997'},
    {name:'maryam', age:20, gender:'female', salary:10000, dob:'18/08/2001'},
    {name:'shaimaa', age:22, gender:'female', salary:9000, dob:'28/5/2000'},
    {name:'alaa', age:32, gender:'male', salary:20000, dob:'14/6/1990'}
  ];

  constructor(private _HttpClient:HttpClient) {}
}
