import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../model/product';
import { DataService } from '../Service/data.service';
import { ProductservicesService } from '../Service/productservices.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  emp: string = "";
  query: string = "";


  isOrderOpen: boolean = false
  isCartOpen: boolean = false
  isProductOpen: boolean = true
  isAdmin:boolean=false

  submit: Product[] = [];
  cart: Product[] = [];


  totalAmount = 0;
  fullAmount = 0;
  DISCOUNTAmount = 0;


 items:Product[]=[];

  constructor(private dataService: DataService,private productService:ProductservicesService,private router:Router) {

  this.loadAllProducts();

  }

  ngOnInit(): void {

  }


  openCart() {
    this.isCartOpen = true;
    this.isProductOpen = false;
  }

  openProduct() {
    this.isCartOpen = false;
    this.isProductOpen = true;
    this.isOrderOpen = false;
  }


  openOrder() {
    this.isCartOpen = false;
    this.isProductOpen = false;
    this.isOrderOpen = true;
  }


  addMore(item: Product) {
    item.QUANTITY++
 this.DISCOUNTAmount = Number(this.DISCOUNTAmount) +Number( item.DISCOUNT)//discount
   this.fullAmount = Number(this.fullAmount) +Number(item.PRICE)//total amount
    this.totalAmount = Number(this.totalAmount)+ Number(Number(item.PRICE) - item.DISCOUNT)//amount after discount

  }


  decrease(item: Product) {
    item.QUANTITY--;
    this.DISCOUNTAmount = Number(this.DISCOUNTAmount) -Number( item.DISCOUNT)//discount
   this.fullAmount = Number(this.fullAmount) -Number(item.PRICE)//total amount
    this.totalAmount = Number(this.totalAmount)- Number(item.PRICE - item.DISCOUNT)//amount after discount
    if (item.QUANTITY == 0) {
      let index = this.cart.indexOf(item)
      if (index != -1) {
        this.cart.splice(index, 1)
      }
    }
  }


  addToCart(item: Product) {
     //console.log(item.PRICE);
    let check: boolean = true;
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].ID === item.ID && this.cart[i].NAME === item.NAME) {
        this.cart[i].QUANTITY++
        this.DISCOUNTAmount = Number(this.DISCOUNTAmount) +Number( item.DISCOUNT)//discount
        this.fullAmount = Number(this.fullAmount) +Number(item.PRICE)//total amount
         this.totalAmount = Number(this.totalAmount)+ Number(Number(item.PRICE) - item.DISCOUNT)//amount after discount
     
        
        check = false;
        break;
      }
    }
    if (check == true) {
      {
        if (item.QUANTITY == 0)
          item.QUANTITY = 1;
      }
      this.DISCOUNTAmount = Number(this.DISCOUNTAmount) +Number( item.DISCOUNT)//discount
   this.fullAmount = Number(this.fullAmount) +Number(item.PRICE)//total amount
    this.totalAmount = Number(this.totalAmount)+ Number(Number(item.PRICE) - item.DISCOUNT)//amount after discount

      
      this.cart.push(item);

      console.log(this.cart);
    }
    console.log(this.totalAmount);
  }
  save() {
    this.submit = this.cart
  }

  
  
  logout(){
    this.dataService.logout();
    this.router.navigateByUrl("/login");
  }





products: Product[]=[];

loadAllProducts() {
  this.productService.getAllProducts().subscribe(
    (data) => {
      console.log(JSON.stringify(data));
      this.products = data;

    },
    (error) => {
      console.log("Some thing went wrong")
      console.log(error.error);

    });
}


  


}
