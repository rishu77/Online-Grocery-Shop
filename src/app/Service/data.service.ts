import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Detail } from '../C/detail';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  emp: Detail = new Detail();
  currentUser: Detail | null = null;


  addEmployee(employee: Detail): Observable<any> {
    console.log("Add emp service:" + JSON.stringify(employee))
    return this.http.post("http://localhost:3000/register/", employee, { responseType: 'text' });
  }


  deleteEmployeeById(eId: number): Observable<any> {

    return this.http.delete("http://localhost:3000/register/" + eId, { responseType: 'text' });
  }

  getAllEmployees(): Observable<any> {

    return this.http.get("http://localhost:3000/register");
  }

  getLoginAccess(employee: Detail): Observable<any> {
    this.currentUser = employee;
    return this.http.post("http://localhost:3000/login/", employee, { responseType: 'text' });

  }


  getLoginUser(): Detail | null {
    return this.currentUser;
  }


  logout() {
    this.currentUser = null;
  }
}



