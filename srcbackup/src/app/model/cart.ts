import { NgbPaginationNumberContext } from "@ng-bootstrap/ng-bootstrap/pagination/pagination"

export class Cart {
    name:string;
    price:number;
    description:string;
    
    constructor(){
        this.name="";
        this.description="";
        this.price=0.00;
        
        
    }
}
