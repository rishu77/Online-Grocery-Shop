import { Injectable } from '@angular/core';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductservicesService {
arr:Product=new Product;
item:Product[]=[]
  constructor() {this.getItem() }
setdata(productDetail:Product){

  this.arr=productDetail;
  this.item.push(productDetail)
  this.items=this.products.concat(this.item)
}


 
delete(prouct:Product){
  let index = this.items.indexOf(prouct)
  if (index != -1) {
    this.items.splice(index, 1)
  }
}
getdata(){
  return this.arr
}
items:Product[]=[]
getItem(){
this.items=this.products.concat(this.item)
}

product1: Product = {name:"White Salt",description: "Spices",price: 50.00, discount:48, id:0, quantity:0};
product2: Product = {name:"Pepper",description: "Spices",price: 25.00, discount:22, id: 1,quantity: 0}
product3: Product = {name:"Black Salt",description: "Spices", price:15.00, discount:15, id:2, quantity:0};
product4: Product = {name:"Kitchen Malasa ",description: "Spices",price: 155.00, discount:145,  id:3, quantity:0};
product5: Product = {name:"Chaana Masala", description:"Spices",price: 150.00,discount: 135, id: 4,quantity: 0};
product6: Product = {name:"Green Moong",description: "Lentils", price:152.00,discount: 146, id: 4,quantity: 0};
product7: Product = {name:"Urad Dal",description: "Lentils", price:123.00, discount:116, id: 4,quantity: 0};
product8: Product = {name:"Masoor Dal", description:"Lentils",price: 110.00,discount: 106, id: 4,quantity: 0};
product9: Product = {name:"Toor/Arhar Dal", description:"Lentils",price: 114.00, discount:102,  id:4,quantity: 0};
product10: Product = {name:"Lobia Dal", description:"Lentils", price:116.00, discount:110, id: 4,quantity: 0};
product11: Product = {name:"Matar Dal",description: "Lentils",price: 114.00, discount:114, id: 4,quantity: 0};
product12: Product = {name:"Choole /Chickpea",description: "Lentils", price:114.00,discount: 98, id: 4,quantity: 0};
product13: Product = {name:"Horsegram/kulth Dal",description: "Lentils",price: 114.00,discount: 100, id: 4,quantity: 0};
//product14: Product = {name:"",description: "", price:0,discount: 0,  id:0, quantity:0};

products: Product[] = [this.product1, this.product2, this.product3, this.product4, this.product5, this.product6,
this.product7, this.product8, this.product9, this.product10, this.product11, this.product12, this.product13];


update(editProduct:Product){
 
 let index= this.items.indexOf(editProduct)
this.items[index]=editProduct
 
}

}
