import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/Service/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  query: string = "";
  constructor(private empService:EmployeeService) { }
employees: Employee[]= [];

  ngOnInit(): void {
    this.loadAllEmployees();
  }

  loadAllEmployees(){
    this.empService.getAllEmployees().subscribe(
      (data)=>{
        console.log(JSON.stringify(data));
        this.employees=data;
      },
      (error) =>{
        console.log("something not working")
        console.log(error.error);
      
      }
    );
  }
  msg:any=undefined;
  errMsg:any=undefined;
 employee:Employee=new Employee();
  addEmployee(){
    this.employee.empid=1; 
    console.log("Add emp called")
    console.log(JSON.stringify(this.employee))
    this.empService.addEmployee(this.employee).subscribe(
      (data)=>{
        this.msg="Added";
        this.errMsg=undefined;
      },
      (error)=>{
        this.msg=undefined;
        this.errMsg="Not added"//JSON.stringify(error.error);
        
      }
    )
  }


  deleteEmployee(id:string){
    console.log("deleting id:"+id)
    this.empService.deleteEmployeeById(parseInt(id)).subscribe(
      (data)=>{
        this.msg="Deleted";
        this.errMsg=undefined;
        this.loadAllEmployees();
      },
      (error)=>{
        this.msg=undefined;
        this.errMsg="Not Deleted"//JSON.stringify(error.error);
        
      }
    );
  }
}
