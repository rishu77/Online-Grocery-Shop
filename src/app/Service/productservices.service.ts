import { Injectable } from '@angular/core';
import { Product } from '../model/product';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductservicesService {
arr:Product=new Product;
item:Product[]=[]
  constructor(private http:HttpClient) { }





addProduct(product:Product):Observable<any>{
  console.log("Add emp product:" + JSON.stringify(product))
   return this.http.post("http://localhost:3000/products/",product,{responseType: 'text'});
  }
 

  deleteProductById(Id:number):Observable<any>{
   
    return this.http.delete("http://localhost:3000/products/"+Id,{responseType: 'text'});
   }
 
  getAllProducts():Observable<any>{
   
    return this.http.get("http://localhost:3000/products");
   }

   getUpdateProduct(product:Product):Observable<any>{
    
    return this.http.post("http://localhost:3000/products/update/",product,{responseType: 'text'});
    
  }
}
