import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Watch } from '../interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {

    constructor(private http: HttpClient) { }

    create(watch: Watch): Observable<any> {
        return this.http.post(`api/carts`, watch)
    }

    getByUser(): Observable<any> {
        return this.http.get(`api/carts`)
    }

     delete(watch: Watch) {
        return this.http.post(`api/carts/${watch.id}`, watch)
     }


}