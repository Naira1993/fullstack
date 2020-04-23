import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-watches',
  templateUrl: './watches.component.html',
  styleUrls: ['./watches.component.css']
})
export class WatchesComponent implements OnInit{

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {


  }


  add() {
    window.setTimeout(() => {
      this.router.navigate(['/add'])
    }, 1000)
  }

}
