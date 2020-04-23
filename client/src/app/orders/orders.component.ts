import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from '../shared/interface';
import { Subscription } from 'rxjs';
import { OrderService } from '../shared/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {

  orders: Order[];
  sub: Subscription;
  email: string;
  isloading = true;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.sub = this.orderService.getAll().subscribe(res => {
      this.orders = res.orders;
      this.isloading = false

    })
    this.email = JSON.stringify(localStorage.getItem('email'))
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  delete(id: string, index: number) {
    this.orderService.delete(id).subscribe(() => {
      this.orders.splice(index, 1)
    })
  }

}
