import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WatchesComponent } from './watches/watches.component';
import { WatchComponent } from './watches/watch/watch.component';
import { AddWatchComponent } from './add-watch/add-watch.component';
import { WatchAboutComponent } from './watches/watch-about/watch-about.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './shared/classes/auth.guard';
import { WatchListComponent } from './watch-list/watch-list.component';


const routes: Routes = [
  {path: '', component: WatchesComponent, children: [
    {path: '', component: WatchComponent},
    {path: 'watch/:id', component: WatchAboutComponent}
  ]},
  {path: 'watches', component: WatchesComponent, children: [
    {path: '', component: WatchComponent},
    {path: ':id', component: AddWatchComponent, canActivate: [AuthGuard]},
    {path: 'watch/:id', component: WatchAboutComponent}
  ]},
  {path: 'watch-list', component: WatchListComponent},
  {path: 'add', component: AddWatchComponent, canActivate: [AuthGuard]},
  {path: 'add/:id', component: AddWatchComponent, canActivate: [AuthGuard]},
  {path: 'cart', component: CartComponent, canActivate: [AuthGuard]},
  {path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},
  {path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
