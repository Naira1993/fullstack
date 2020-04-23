import { Component, OnInit, OnDestroy, OnChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MaterialInstance, MaterialService } from '../../classes/material.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy, AfterViewInit {

  sidenav;
  subscribtion: Subscription;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    console.log(this.sidenav);

   
  }

  ngOnDestroy() {
    if (this.subscribtion) {
      this.subscribtion.unsubscribe()
    }
    MaterialService.getInstance(this.sidenav).destroy()
  }

  ngAfterViewInit() {
    this.sidenav = document.querySelector('.sidenav')
  }

  open() {
    MaterialService.getInstance(this.sidenav).open()
  }

  close() {
    MaterialService.getInstance(this.sidenav).close()
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

}
