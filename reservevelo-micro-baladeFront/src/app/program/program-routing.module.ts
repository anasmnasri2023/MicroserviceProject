import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramComponent } from './program.component';
import { ListprogramComponent } from './listprogram/listprogram.component';
import { AjouterProgramComponent } from './ajouter-program/ajouter-program.component';
import { DetailProgramComponent } from './detail-program/detail-program.component';

const routes: Routes = [
  { path: '', component: ListprogramComponent },  // Changed to ListprogramComponent
  { path: 'list', component: ListprogramComponent },
  { path: 'add', component: AjouterProgramComponent },
  { path: 'detail/:id', component: DetailProgramComponent }  // Added :id parameter
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramRoutingModule { }
