import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../interface';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class OrderService {
    constructor(private http: HttpClient) { }
    
    create(cart: Cart) {
        return this.http.post(`api/orders`, cart)
    }

    getAll(): Observable<any> {
        return this.http.get(`api/orders`)
    }

    delete(id: string) {
        return this.http.delete(`api/orders/${id}`)
    }
}