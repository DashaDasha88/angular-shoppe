import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any = []
  public productList = new BehaviorSubject<any>([]); //contains the current value; holds value that needs to be shared with other components

  constructor() { }

  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product); //push product inside cartItemList
    this.productList.next(product); //to emit the data; next will pass it to wherever it's been subscribed
  }

  addtoCart(product: any) {
    this.cartItemList.push(product) //this will push the product inside the cart
    this.productList.next(this.cartItemList) //to emit
    this.getTotalPrice();
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a:any) => {
      grandTotal += a.total;
    })
    return grandTotal;
  }

  removeCartItem(product: any) {
    this.cartItemList.map((a:any, index:any) => { //index is whichever item we need to remove
      if(product.id === a.id) {
        this.cartItemList.splice(index, 1); //can remove one item from the cart by this method
      }
    })
    this.productList.next(this.cartItemList);
  }

  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }
}
