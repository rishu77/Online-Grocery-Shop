import { Component, OnInit } from '@angular/core';
import { Detail } from '../C/detail';
import { DataService } from '../Service/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  isFilled:boolean=false;
  constructor(private dataService:DataService ) {}

  ngOnInit(): void {
  }
  
  
  
  msg:any=undefined;
  errMsg:any=undefined;
  emp:Detail=new Detail;
  
  addEmployee(){

    console.log("Add emp called")
    console.log(JSON.stringify(this.emp))
    this.dataService.addEmployee(this.emp).subscribe(
      (data)=>{
        this.msg="Added";
        this.errMsg=undefined;
        this.isFilled=true
      },
      (error)=>{
        this.msg=undefined;
        this.errMsg="Not added"//JSON.stringify(error.error);
        
      }
    )
  }
}
