import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/shared/interface';

@Injectable({providedIn: 'root'})
export class CommentService {
    constructor(private http: HttpClient) { }

    create(comment: Comment): Observable<any> {
        return this.http.post(`/api/comments`, comment)
    }

    getAllByWatch(watch_id: string): Observable<any> {
        return this.http.post(`/api/comments/${watch_id}`, {})
    }

    getById(id: string): Observable<any> {
        return  this.http.get(`/api/watches/${id}`)
    }

    update(id: string, comment: Comment) {    
            return this.http.patch(`/api/comments/${id}`, comment)
    }
    
}