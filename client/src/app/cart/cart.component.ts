import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaterialService } from '../shared/classes/material.service';
import { OrderService } from '../shared/services/order.service';
import { Cart } from '../shared/interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  constructor(private cartService: CartService,
    private orderService: OrderService,
    private router: Router) { }

  cart = [];
  priceAll = 0;
  sub: Subscription;
  orderItem: Cart;
  isloading = true



  ngOnInit() {
   this.sub = this.cartService.getByUser().subscribe( res => {
     this.orderItem = res.cart;
       this.cart = res.cart.items;
       this.priceAll = res.cart.price;
       this.isloading = false
      })
  }

  ngOnDestroy() {   
    this.sub.unsubscribe();
  }

  order() {
    this.orderService.create(this.orderItem).subscribe(()=> {
      this.router.navigate(['/orders'])
    }
    , error => {
      MaterialService.toast(`${error.error.message}`)
    }
    )
  }


  delete(index: number) {
    this.priceAll-= this.cart[index].price
    this.cartService.delete(this.cart[index]).subscribe(() => {
      if(this.cart[index].count > 1) {
           this.cart[index].count-=1
      } else {
         this.cart.splice(index, 1)
      }
    }
    , error => {
      console.log(error);
      MaterialService.toast(`${error.error.message}`)
    }
    )
  }

}
