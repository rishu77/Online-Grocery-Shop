import { HtmlParser } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './Service/data.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router :Router,private dataService:DataService){}
  ngOnInit(): void {
    this.router.navigateByUrl("/register");
  }
  
    
 
   
}

