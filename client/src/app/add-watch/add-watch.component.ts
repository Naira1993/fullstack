import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { WatchService } from '../shared/services/watch.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Watch } from '../shared/interface';
import { MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-add-watch',
  templateUrl: './add-watch.component.html',
  styleUrls: ['./add-watch.component.css']
})
export class AddWatchComponent implements OnInit, OnDestroy {

  @ViewChild('input') inputRef: ElementRef;
  image: File;
  imagePreview: any = ''
  form: FormGroup;
  sub: Subscription;
  id: string;
  watch: Watch;

  constructor(private watchService: WatchService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      model: new FormControl(null, Validators.required),
      price: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      image: new FormControl(null)
    });
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      // MaterialService.updateTextFields()
      this.sub = this.watchService.getById(this.id).subscribe(res => {
        this.watch = res.watch;
        this.form.patchValue({
          ...res.watch
        })
      })
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    this.image = file;
    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreview = reader.result
    }
    reader.readAsDataURL(file)
  }

  onSubmit() {
    this.form.disable()
    const watch = {
      title: this.form.value.title,
      model: this.form.value.model,
      price: this.form.value.price,
      like: this.watch ? this.watch.like : []
    }
    if (this.id) {
      this.watchService.update(this.id, watch, this.image).subscribe(() => {

      })
    } else {
      this.watchService.create(watch, this.image).subscribe(() => {
        console.log('Created');
      })
    }
    setTimeout(() => {
      this.router.navigate(['/'])
      this.form.reset();
      this.form.enable()
    }, 1500)

  }

}
