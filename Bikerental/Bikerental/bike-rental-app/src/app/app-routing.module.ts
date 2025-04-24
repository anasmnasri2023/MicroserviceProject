import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { BikeComponent } from './components/bike/bike.component';
import { RentBikeComponent } from './components/bike/rent-bike/rent-bike.component';
import { EventComponent } from './components/event/event.component';

// Remove if it doesn't exist
// import { ListEventComponent } from './components/event/list-event/list-event.component';

// Auth Guard
import { AuthGuard } from './guards/auth.guard';
import {VelorentListComponent} from "./components/bike/rent-bike/velorent-list/velorent-list.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'bikes', component: BikeComponent , canActivate: [AuthGuard] },
  { path: 'rent-bike/:id', component: RentBikeComponent, canActivate: [AuthGuard] },
  { path: 'rent-bike', component: RentBikeComponent, canActivate: [AuthGuard] },
  { path: 'events', component: EventComponent , canActivate: [AuthGuard] },
  { path: 'events/:id', component: EventComponent,  canActivate: [AuthGuard] },
  { path: 'velorentList', component: VelorentListComponent, canActivate: [AuthGuard] },

  // Redirect to home for any unknown paths
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
