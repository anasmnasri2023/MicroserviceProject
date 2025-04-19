import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListbaladeComponent } from './balade/listbalade/listbalade.component';
import { AddbaladeComponent } from './balade/addbalade/addbalade.component';
import { DetailBaladeComponent } from './balade/detail-balade/detail-balade.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // route d'accueil
  { path: 'home', component: HomeComponent },
  { path: 'listbalade', component: ListbaladeComponent},
  { path: 'addbalade', component: AddbaladeComponent },
  { path: 'balade-detail/:id', component: DetailBaladeComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
