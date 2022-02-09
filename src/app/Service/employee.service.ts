import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }
  getAllEmployees():Observable<any>{
    return this.http.get("http://localhost:3000/employees");
 
 }
 addEmployee(employee:Employee):Observable<any>{
  console.log("Add emp service:" + JSON.stringify(employee))
   return this.http.post("http://localhost:3000/employees/",employee,{responseType: 'text'});
  }
  deleteEmployeeById(eId:number):Observable<any>{
   
    return this.http.delete("http://localhost:3000/employees/"+eId,{responseType: 'text'});
   }

updateEmployeeById(employee:Employee):Observable<any>{
  return this.http.delete("http://localhost:3000/employees/"+employee.empid,{responseType: 'text'});
  
}   
}
