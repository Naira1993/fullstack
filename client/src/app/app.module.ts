import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddWatchComponent } from './add-watch/add-watch.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { AuthComponent } from './auth/auth.component';
import { WatchesComponent } from './watches/watches.component';
import { WatchComponent } from './watches/watch/watch.component';
import { WatchAboutComponent } from './watches/watch-about/watch-about.component';
import { MainComponent } from './shared/layout/main/main.component';
import { NavbarComponent } from './shared/layout/navbar/navbar.component';
import { TokenInterceptor } from './shared/classes/token.interceptor';
import { WatchListComponent } from './watch-list/watch-list.component';
import { SearchPipe } from './shared/pipes/search.pipe';
import { CommentComponent } from './watches/watch-about/comment/comment.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    AddWatchComponent,
    CartComponent,
    OrdersComponent,
    AuthComponent,
    WatchesComponent,
    WatchComponent,
    WatchAboutComponent,
    MainComponent,
    NavbarComponent,
    WatchListComponent,
    SearchPipe,
    CommentComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
