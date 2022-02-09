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

  user: Detail = new Detail();

  constructor(private dataService: DataService, private router: Router) {

  }

  ngOnInit(): void {

  }
  iscorrect: boolean = false;

  save1() {
    this.dataService.getLoginAccess(this.user).subscribe(
      (data) => {


        console.log(JSON.stringify(data));

        if ((this.user.EMAIL == "admin@gmail.com") &&
          (JSON.stringify(this.user.PASSWORD == "admin"))) {
          this.router.navigateByUrl("/user")
        }

        else {
          console.log(this.iscorrect = true)
          this.welcome();
        }

      },
      (error) => {
        console.log("Some thing went wrong")
        console.log(error.error);
        alert("wrong credentail")
      });
  }
  welcome() {
    this.router.navigateByUrl("/welcome");
  }

}



