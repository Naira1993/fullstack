import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Watch } from '../interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WatchService {
    constructor(private http: HttpClient) { }

    create(watch: Watch, image?: File) {

        const fd = new FormData();
        if (image) {
            fd.append('image', image, image.name)
        };
        fd.append('title', watch.title);
        fd.append('model', watch.model);
        fd.append('price', watch.price + '');

        return this.http.post(`/api/watches`, fd)
    }

    getAll(): Observable<any> {
        return this.http.get(`/api/watches`)
    }

    getById(id: string): Observable<any> {
        return  this.http.get(`/api/watches/${id}`)
    }

    update(id: string, watch: Watch, image?: File) {
            const fd = new FormData();
            if (image) {
                fd.append('image', image, image.name)
            };
            fd.append('title', watch.title);
            fd.append('model', watch.model);
            fd.append('price', watch.price + '');
            console.log(fd);
            return this.http.patch(`/api/watches/${id}`, watch)
    }


}