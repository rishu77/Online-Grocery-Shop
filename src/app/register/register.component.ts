import { Component, OnInit } from '@angular/core';
import { Detail } from '../C/detail';
import { DataService } from '../Service/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  emp:Detail=new Detail;
  isFilled:boolean=false;
  constructor(private dataService:DataService ) {}
str:Detail[]=[]
  ngOnInit(): void {
  }
  
  
  save(){
  
     
     this.str.unshift(this.emp)
 

   this.dataService.setdata(this.emp)
   if(this.emp.email==""||this.emp.name==""||this.emp.firstName==""||this.emp.lastName==""
   ||this.emp.password==""){
   alert("Please Fill All The Details")
   }else{
   this.isFilled=true;
   console.log(this.str)
   this.emp=new Detail(); }
  
  }
}
