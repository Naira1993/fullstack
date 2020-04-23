import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Watch shop';
  constructor(private authService: AuthService){}

  ngOnInit() {
     const candidate = localStorage.getItem('auth-token');
     if(candidate !== null) {
       this.authService.setToken(candidate)
     }
  }
}
