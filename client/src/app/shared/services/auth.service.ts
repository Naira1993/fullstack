import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators'



@Injectable({providedIn: 'root'})
export class AuthService {

   islogin: false;
   token = null;

    constructor(private http: HttpClient) { }

    login(user: {email: string, password: string}): Observable<{token: string}> {
       return this.http.post<{token: string}>(`/api/auth/login`, user).pipe(tap(
          ({token}) => {
             localStorage.setItem('auth-token', token);
             localStorage.setItem('email', user.email);
             this.setToken(token)
          }
       ))
    }

    registration(user: {email: string, password: string}): Observable<any>{
       return this.http.post(`/api/auth/registration`, user)
    }

   setToken(token: string) {
      this.token = token
   }
   
   getToken(): string {
      return this.token
   }

   isAuthenticated(): boolean {
     return !!this.token
   }

   logout() {
      this.setToken(null);
      localStorage.clear()
   }
 }