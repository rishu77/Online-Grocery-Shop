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
  product: Product = new Product();
  arr: Product[] = []
  query: String = ""
  emp: string = ""
  msg: any = undefined;
  errMsg: any = undefined;
  products: Product[] = []
  constructor(private productService: ProductservicesService, private dataService: DataService, private router: Router) {
    this.loadAllProducts();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  addProduct() {
    this.product.ID = 111;
    console.log("Add product called")
    console.log(JSON.stringify(this.product))
    this.productService.addProduct(this.product).subscribe(
      (data) => {
        this.msg = "Added";
        this.errMsg = undefined;
        this.loadAllProducts();
      },
      (error) => {
        this.msg = undefined;
        this.errMsg = "Not added"//JSON.stringify(error.error);

      }
    )
  }

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

  deleteProduct(id: string) {
    console.log("deleting id:" + id)
    this.productService.deleteProductById(parseInt(id)).subscribe(
      (data) => {
        this.msg = "Deleted";
        this.errMsg = undefined;
        this.loadAllProducts();
      },
      (error) => {
        this.msg = undefined;
        this.errMsg = "Not Deleted"//JSON.stringify(error.error);

      }
    );

   
  }
  updateProduct(){
    this.isUpdate = true;
  
    this.productService.getUpdateProduct(this.product).subscribe(
      (data) => {
        console.log(JSON.stringify(data));
        this.msg = "Updated";
        this.errMsg = undefined;
        this.loadAllProducts();
      },
      (error) => {
        this.msg = undefined;
        this.errMsg = "Not Updates"//JSON.stringify(error.error);

      }
    )
  }


  isUpdate: boolean = false

  update(editProduct: Product) {
    this.isUpdate = true;

    this.product=editProduct;
  }

  logout() {
    this.dataService.logout();
    this.router.navigateByUrl("/login");
  }

}

