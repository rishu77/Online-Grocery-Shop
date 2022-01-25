import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Detail } from '../C/detail';


import { DataService } from '../Service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  
user:Detail=new Detail();




  constructor(private dataService: DataService, private router: Router) {
   
   }



  ngOnInit(): void {
  
  }
a:Detail[]=[]

  save() {
    if(this.dataService.checking(this.user.email,this.user.password)=="true")
    { if((this.user.email=="admin@gmail.com")&&
     (JSON.stringify(this.user.password=="admin")))
    {
      this.router.navigateByUrl("/user")
          }
          else
          {
            this.welcome()

            
          }
    }else
    alert("wrong credentail")
   
  }
  


  welcome() {
    this.router.navigateByUrl("/welcome");
  }
}




