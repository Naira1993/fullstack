import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { WatchService } from '../shared/services/watch.service';
import { Subscription } from 'rxjs';
import { Watch } from '../shared/interface';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css']
})
export class WatchListComponent implements OnInit {

  searchStr = '';
  watches: Watch[] = [];
  id: number;
  subscription: Subscription
;
  constructor(private watchService: WatchService,
    private route: ActivatedRoute) { }

   ngOnInit() {
    this.subscription = this.watchService.getAll()
      .subscribe( res => {
        this.watches = res.watches
      })
    this.route.params
      .subscribe((params: Params) => {
        this.id = params.id
      })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
