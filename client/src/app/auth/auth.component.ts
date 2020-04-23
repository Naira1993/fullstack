import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterialService } from '../shared/classes/material.service';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  active = true;
  form1: FormGroup;
  form2: FormGroup;
  isLogin = false;
  subscription: Subscription

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    MaterialService.init(document.querySelectorAll('.tabs'));

    this.form1 = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    this.form2 = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })

  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  login() {
    this.form1.disable()
    const user = {
      ...this.form1.value
    }
    try {
      this.subscription = this.authService.login(user).subscribe((res) => {
        this.router.navigate(['/'])
      }, error => {
        MaterialService.toast(`${error.error.message}`)
      })
    } catch (error) {
      console.log(error); 
    }

    this.form1.enable();
    this.form1.reset()
  }

  registration() {
    this.form2.disable()
    const user = {
      ...this.form2.value
    }
     this.subscription = this.authService.registration(user).subscribe((res) => {
        MaterialService.toast(`${res.message}`)
        this.router.navigate(['/auth'], {
          queryParams: {
            registered: true
          },
          fragment: 'login'
        })
      }, error => {
        MaterialService.toast(`${error.error.message}`)
      })
    this.form2.enable();
    this.form2.reset()
  }

}
