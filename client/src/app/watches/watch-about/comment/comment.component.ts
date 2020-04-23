import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/shared/interface';
import { CommentService } from 'src/app/shared/services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment;
  @Input() index: number;
  isLike = false;
  isDislike = false;
  email: string;

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('email')
    const index1 = this.comment.like.findIndex(c => c === this.email);
    if(index1 !== -1) {
      this.isLike = true
    } else {
      const index2 = this.comment.dislike.findIndex(c => c === this.email);
      if(index2 !== -1) {
        this.isDislike = true
      }
    }
  }

  like(type: boolean) {
    this.isLike = type;
    const comment = { ...this.comment }
    if(type) {
       comment.like.push(this.email);
       const index = comment.dislike.findIndex(c => c === this.email);
       comment.dislike.splice(index, 1)
       this.isDislike = !type
    } else {
      const index = comment.like.findIndex(c => c === this.email);
      comment.like.splice(index, 1)
    }
    this.commentService.update(comment.id, comment).subscribe()
  }

  dislike(type: boolean) {
    this.isDislike = type
    const comment = { ...this.comment }
    if(type) {
       comment.dislike.push(this.email);
      const index = comment.like.findIndex(c => c === this.email);
      comment.like.splice(index, 1)
       this.isLike = !type   
    } else {
      const index = comment.dislike.findIndex(c => c === this.email);
      comment.dislike.splice(index, 1)
    }
    this.commentService.update(comment.id, comment).subscribe()
  }
}
