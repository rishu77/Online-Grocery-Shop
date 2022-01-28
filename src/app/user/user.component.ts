import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../model/product';
import { DataService } from '../Service/data.service';
import { ProductservicesService } from '../Service/productservices.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  product: Product = new Product;
  arr: Product[] = []
  query: String = ""
  emp: string = ""
  products: Product[] = []
  constructor(private productService: ProductservicesService, private dataService: DataService,private router :Router) {
    this.products = this.productService.items;
    this.emp = JSON.stringify(this.dataService.currentUser?.email)
  }

  ngOnInit(): void {
  }

  save() {


    this.productService.setdata(this.product)
    this.products = this.products.concat(this.product);
    this.product = new Product();


  }
  save1(){
    this.productService.update(this.product)
   
    this.product = new Product();


  }
  delete( item:Product) {
    let index = this.products.indexOf(item)
      if (index != -1) {
        this.products.splice(index, 1)
      }
    this.productService.delete(item);
  }

  isUpdate:boolean=false
  
  update(editProduct:Product){
    this.isUpdate=true;
    
   this.product=editProduct
  
  }
    
  logout(){
    this.dataService.logout();
    this.router.navigateByUrl("/login");
  }

}

