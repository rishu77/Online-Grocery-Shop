import { NgIfContext } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Product } from '../model/product';
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  isvis:boolean=true;
 /* products:Product[]=[];
 product1:Product=new Product("hp","laptop",55000.00,0,0,0);
  product2:Product=new Product("vivo","mobile",25000.00,1,0,0);
  product3:Product=new Product("apple","mobile",95000.00,2,0,0);
  product4:Product=new Product("apple","laptop",155000.00,3,0,0);
  product5:Product=new Product("apple","airpods",15000.00,4,0,0);*/
count:number=0
 

  cart:Array<{name:string,price:number}>=[]
  
 addCart(x:Product){
{
  

 // this.cart.push(x)

 }

 
}
  delete(){
 
 this.cart.pop();
  }
}
