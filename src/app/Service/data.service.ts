import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Detail } from '../C/detail';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  emp: Detail = new Detail();
  admin: Detail = { name: "Admin", email: "admin@gmail.com", firstName: "admin", lastName: "admin", password: "admin" };
  user:Detail={name: "User", email: "user@gmail.com", firstName: "user", lastName: "user", password: "12345"}
  flag: string = "";
  arr: Detail[] = []
 constructor() { }
  currentUser: Detail | null = null;


  checking(email: string, password: string){
  if( ((this.user.email==email)&&(this.user.password==password))){
    this.flag = "true"
    this.currentUser = this.user;
  }
  else if ((this.admin.email==email) &&(this.admin.password==password)) {
    this.flag = "true"
    this.currentUser = this.admin;
    
  } else if (this.check(email,password)) {
    this.flag="true"
    } 
    return this.flag;
 

}
  check(email: string, password: string) {

    
    for (let i = 0; i < this.arr.length; i++) {
      if (((this.arr[i].email == email) && (this.arr[i].password == password))) 
      {
        this.flag = "true"
        this.currentUser = this.arr[i];
      }
      

     
    }

    return this.flag
  }


  logout() {
    this.currentUser = null;
  }
  getLoginUser(): Detail | null {
    return this.currentUser;
  }


  setdata(empData: Detail) {

    this.emp = empData
    this.arr.push(this.emp)
  }

  getdata() {

    return this.emp
  }
}
