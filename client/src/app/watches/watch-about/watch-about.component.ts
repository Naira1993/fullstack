import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Watch, Comment } from 'src/app/shared/interface';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { WatchService } from 'src/app/shared/services/watch.service';
import { CommentService } from 'src/app/shared/services/comment.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-watch-about',
  templateUrl: './watch-about.component.html',
  styleUrls: ['./watch-about.component.css']
})
export class WatchAboutComponent implements OnInit, OnDestroy {

  id: string;
  watch: Watch;
  comments = [];
  form: FormGroup;
  isLike = false;
  count = 0;
  user_email: string;
  sub: Subscription;
  isloading = true;


  constructor(private route: ActivatedRoute,
    private watchService: WatchService,
    private cartService: CartService,
    private commentService: CommentService,
    private router: Router) { }

  ngOnInit() {
    this.user_email = JSON.stringify(window.localStorage.getItem('email'));
    this.form = new FormGroup({
      comment: new FormControl(null, Validators.required)
    })
    this.id = this.route.snapshot.params['id'] + '';
    this.sub = this.watchService.getById(this.id).subscribe(res => {
      this.watch = res.watch;
      setTimeout(() => {
        this.isloading = false
      }, 1000)
      if (this.watch.like.findIndex(c => c === this.user_email) !== -1) {
        this.isLike = true
      };
      this.commentService.getAllByWatch(res.watch.id).subscribe((res) => {
        this.comments = res.comments
      })
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  buy(watch: Watch) {
    this.cartService.create(watch).subscribe(() => {
      this.router.navigate(['/cart'])
    })
  }

  onSubmit() {
    const comment: Comment = {
      user_email: this.user_email,
      text: this.form.value.comment,
      watch_id: this.watch.id,
      like: [],
      dislike: []
    }

    this.commentService.create(comment).subscribe(() => {
      this.comments.push(comment)
    })
  }

  like(type: boolean) {
    if (this.user_email) {
      this.isLike = type
      if (type) {
        this.watch.like.push(this.user_email);
      } else {
        this.watch.like = this.watch.like.filter(c => c !== this.user_email)
      }
      this.watchService.update(this.watch.id, this.watch).subscribe(() => {
      })
    } else {
      MaterialService.toast(`Please login`)
    }
  }

}
