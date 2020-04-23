import { Component, OnInit, OnDestroy } from '@angular/core';
import { Watch } from 'src/app/shared/interface';
import { Subscription } from 'rxjs';
import { WatchService } from 'src/app/shared/services/watch.service';
import { Router } from '@angular/router';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit, OnDestroy {

  pageOfWatches: Array<any>;
  page: Number = 0;
  start = 0;
  end = 4;
  watches: Watch[];
  sub: Subscription;
  isloading = true

  constructor(private watchService: WatchService,
    private cartService: CartService,
    private router: Router) { }

  ngOnInit(): void {
    this.sub = this.watchService.getAll().subscribe((res) => {
      this.watches = res.watches;
      const count = Math.ceil(this.watches.length / 4);
      this.pageOfWatches = Array(count).fill(0).map((x, i) => i)
      setTimeout(()=> {
        this.isloading = false
      }, 1500)
    })
   
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }

  setPage(item) {
    this.page = item
    this.start = item * 4;
    this.end = this.start + 4
  }

  changePage(type: boolean) {
    console.log(type);

    if (type) {
      this.page = +this.page + 1;
      this.start = this.start + 4;
      this.end = this.start + 4;
    } else if (this.start) {
      this.page = +this.page - 1;
      this.start = this.start - 4;
      this.end = this.start + 4;
    }
  }

  update(watch: Watch) {
    const email = localStorage.getItem('email');
    if (email === watch.user_email) {
      this.router.navigate([`/add/${watch.id}`])
    } else {
      MaterialService.toast(`You didn't add this watch`)
    }
  }

  buy(watch: Watch) {
    this.cartService.create(watch).subscribe(() => {
      this.router.navigate(['/cart'])
    })
  }
}
