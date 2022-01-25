import { Component, OnInit } from '@angular/core';
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
  discountAmount = 0;


 items:Product[]=[];

  constructor(private dataService: DataService,private productService:ProductservicesService) {

  this.items=this.productService.items;
  
    
    this.emp = JSON.stringify(this.dataService.currentUser?.email);
    if(this.dataService.currentUser?.email=="admin@gmail.com"){
      this.isAdmin=true
    }
    else
    this.isAdmin=false
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
    item.quantity++
 this.totalAmount =Number(this.totalAmount) +Number( item.discount)
   this.fullAmount = Number(this.fullAmount) +Number(item.price)
    this.discountAmount = Number(this.discountAmount) + Number(item.price - item.discount)

  }


  decrease(item: Product) {
    item.quantity--;
    this.totalAmount = Number(this.totalAmount) -Number(item.discount);
    this.fullAmount = Number(this.fullAmount) -Number( item.price);
    this.discountAmount =Number(this.discountAmount) -Number( (item.price - item.discount));
    if (item.quantity == 0) {
      let index = this.cart.indexOf(item)
      if (index != -1) {
        this.cart.splice(index, 1)
      }
    }
  }


  addToCart(item: Product) {
    // console.log(item);
    let check: boolean = true;
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].id === item.id && this.cart[i].name === item.name) {
        this.cart[i].quantity++
        this.totalAmount =Number( this.totalAmount )+ Number(item.discount);
        this.fullAmount =Number(this.fullAmount) +Number(item.price);
        this.discountAmount =Number(this.discountAmount )+ Number(item.price - item.discount);
        check = false;
        break;
      }
    }
    if (check == true) {
      {
        if (item.quantity == 0)
          item.quantity = 1;
      }
      this.totalAmount =Number(this.totalAmount)+ Number(item.discount);
      this.fullAmount =Number(this.fullAmount)+Number( item.price);
      this.discountAmount += Number(this.discountAmount)+Number(item.price - item.discount);
      this.cart.push(item);

      console.log(this.cart)
    }
    console.log(this.totalAmount);
  }
  save() {
    this.submit = this.cart
  }

  
  


}
